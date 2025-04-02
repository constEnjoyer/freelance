const prisma = require('./prisma/client'); // Подключаем Prisma Client
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();

const generateAccessToken = (id, roles) => {
    const payload = { id, roles };
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
}

// Функция для генерации ссылки активации с токеном
const generateActivationLink = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
    return `http://localhost:3000/api/auth/activate?token=${token}`; // Замените на ваш домен
};

// Отправка email с ссылкой для активации
const sendActivationEmail = async(email, activationLink) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Вы можете изменить сервис на ваш предпочтительный
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Активация аккаунта',
        text: `Для завершения регистрации перейдите по следующей ссылке: ${activationLink}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Activation email sent');
    } catch (error) {
        console.log('Error sending activation email:', error);
    }
}

class AuthController {
    // Регистрация пользователя
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Registration error', errors });
            }

            const { username, password, email } = req.body;

            // Проверяем, существует ли пользователь с таким email или username
            const candidate = await prisma.users.findFirst({
                where: {
                    OR: [
                        { username },
                        { email }
                    ]
                }
            });

            if (candidate) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Хешируем пароль
            const hashPassword = bcrypt.hashSync(password, 7);

            // Проверяем, существует ли роль "user", если нет — создаём
            let userRole = await prisma.roles.findUnique({ where: { value: 'user' } });
            if (!userRole) {
                userRole = await prisma.roles.create({ data: { value: 'user' } });
            }

            // Создаём нового пользователя
            const newUser = await prisma.users.create({
                data: {
                    username,
                    email, // Добавляем email
                    password: hashPassword,
                    user_roles: {
                        create: [{ role_id: userRole.id }],
                    },
                    isActive: false // Статус активации аккаунта
                },
            });

            // Генерация ссылки для активации
            const activationLink = generateActivationLink(newUser.id);

            // Отправка письма с активацией
            await sendActivationEmail(email, activationLink);

            return res.json({ message: 'User created, activation email sent' });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Registration error' });
        }
    }

    // Активация аккаунта по ссылке
    async activateAccount(req, res) {
        const { token } = req.query;

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const userId = decoded.id;

            // Обновляем статус пользователя (например, active = true)
            await prisma.users.update({
                where: { id: userId },
                data: { isActive: true },
            });

            res.json({ message: 'Account activated successfully' });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Invalid or expired token' });
        }
    }

    // Логин пользователя
    async login(req, res) {
        try {
            const { username, password } = req.body;

            // Ищем пользователя
            const user = await prisma.users.findUnique({
                where: { username },
                include: { user_roles: { include: { roles: true } } },
            });

            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            // Проверяем пароль
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            // Проверяем, активирован ли аккаунт
            if (!user.isActive) {
                return res.status(400).json({ message: 'Account not activated' });
            }

            // Извлекаем роли
            const roles = user.user_roles.map(ur => ur.roles.value);
            const token = generateAccessToken(user.id, roles);
            return res.json({ token });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Login error' });
        }
    }

    // Получение пользователей
    async getUsers(req, res) {
        try {
            // Получаем всех пользователей с их ролями
            const users = await prisma.users.findMany({
                include: { user_roles: { include: { roles: true } } },
            });

            const formattedUsers = users.map(user => ({
                id: user.id,
                username: user.username,
                roles: user.user_roles.map(ur => ur.roles.value),
            }));

            res.json(formattedUsers);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error fetching users' });
        }
    }
}

module.exports = new AuthController();