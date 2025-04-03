const prisma = require('../prisma/client');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const generateAccessToken = (id, roles) => {
    const payload = { id, roles };
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
};

// Генерация токена и ссылки (универсальная функция для активации и сброса)
const generateTokenAndLink = (userId, purpose = 'activate') => {
    const token = jwt.sign({ id: userId, purpose }, process.env.SECRET_KEY, { expiresIn: '1h' });
    if (purpose === 'reset') {
        return `http://localhost:3000/reset-password?token=${token}`; // Ссылка для сброса
    }
    return `http://localhost:3000/api/auth/activate?token=${token}`; // Ссылка для активации
};

// Настройка Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Универсальная функция отправки email
const sendEmail = async(email, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`${subject} email sent to ${email}`);
    } catch (error) {
        console.log(`Error sending ${subject} email:`, error);
        throw error;
    }
};

class AuthController {
    // Регистрация пользователя
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Registration error', errors });
            }

            const { username, password, email } = req.body;

            const candidate = await prisma.users.findFirst({
                where: { OR: [{ username }, { email }] },
            });
            if (candidate) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            let userRole = await prisma.roles.findUnique({ where: { value: 'user' } });
            if (!userRole) {
                userRole = await prisma.roles.create({ data: { value: 'user' } });
            }

            const newUser = await prisma.users.create({
                data: {
                    username,
                    email,
                    password: hashPassword,
                    user_roles: { create: [{ role_id: userRole.id }] },
                    isActive: false,
                },
            });

            const activationLink = generateTokenAndLink(newUser.id, 'activate');
            await sendEmail(email, 'Активация аккаунта',
                `Для завершения регистрации перейдите по ссылке: ${activationLink}`);

            return res.json({ message: 'User created, activation email sent' });
        } catch (error) {
            console.log('Registration error:', error);
            res.status(400).json({ message: 'Registration error' });
        }
    }

    // Активация аккаунта
    async activateAccount(req, res) {
        try {
            const { token } = req.query;
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            if (decoded.purpose !== 'activate') {
                return res.status(400).json({ message: 'Invalid token purpose' });
            }

            const user = await prisma.users.findUnique({ where: { id: decoded.id } });
            if (!user || user.isActive) {
                return res.status(400).json({ message: 'User not found or already activated' });
            }

            await prisma.users.update({
                where: { id: decoded.id },
                data: { isActive: true },
            });

            return res.json({ message: 'Account activated successfully' });
        } catch (error) {
            console.log('Activation error:', error);
            res.status(400).json({ message: 'Invalid or expired token' });
        }
    }

    // Логин пользователя
    async login(req, res) {
        try {
            const { identifier, password } = req.body; // Изменено на identifier для гибкости
            const user = await prisma.users.findFirst({
                where: { OR: [{ username: identifier }, { email: identifier }] },
                include: { user_roles: { include: { roles: true } } },
            });

            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            if (!user.isActive) {
                return res.status(400).json({ message: 'Account not activated' });
            }

            const roles = user.user_roles.map(ur => ur.roles.value);
            const token = generateAccessToken(user.id, roles);
            return res.json({ token });
        } catch (error) {
            console.log('Login error:', error);
            res.status(400).json({ message: 'Login error' });
        }
    }

    // Получение пользователей
    async getUsers(req, res) {
        try {
            const users = await prisma.users.findMany({
                include: { user_roles: { include: { roles: true } } },
            });

            const formattedUsers = users.map(user => ({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: user.user_roles.map(ur => ur.roles.value),
                isActive: user.isActive,
            }));

            res.json(formattedUsers);
        } catch (error) {
            console.log('Get users error:', error);
            res.status(500).json({ message: 'Error fetching users' });
        }
    }

    // Запрос сброса пароля
    async requestPasswordReset(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Validation error', errors });
            }

            const { email } = req.body;
            const user = await prisma.users.findUnique({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const resetLink = generateTokenAndLink(user.id, 'reset');
            await prisma.passwordResetToken.create({
                data: {
                    token: resetLink.split('token=')[1], // Извлекаем только токен
                    userId: user.id,
                    expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 минут
                },
            });

            await sendEmail(email, 'Сброс пароля',
                `Для сброса пароля перейдите по ссылке: ${resetLink}\nСсылка действительна 30 минут.`);

            return res.json({ message: 'Password reset link sent to your email' });
        } catch (error) {
            console.log('Request password reset error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    // Сброс пароля
    async resetPassword(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Validation error', errors });
            }

            const { token, newPassword } = req.body;
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            if (decoded.purpose !== 'reset') {
                return res.status(400).json({ message: 'Invalid token purpose' });
            }

            const resetToken = await prisma.passwordResetToken.findUnique({
                where: { token },
            });

            if (!resetToken || resetToken.expiresAt < new Date()) {
                return res.status(400).json({ message: 'Invalid or expired token' });
            }

            const hashPassword = bcrypt.hashSync(newPassword, 7);
            await prisma.users.update({
                where: { id: resetToken.userId },
                data: { password: hashPassword },
            });

            await prisma.passwordResetToken.delete({
                where: { id: resetToken.id },
            });

            return res.json({ message: 'Password successfully reset' });
        } catch (error) {
            console.log('Reset password error:', error);
            res.status(400).json({ message: 'Invalid or expired token' });
        }
    }
}

module.exports = new AuthController();