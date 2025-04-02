const express = require('express');
const authRouter = require('./authRouter');
const prisma = require('./prisma/client'); // Добавляем Prisma

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRouter);

const initializeRoles = async() => {
    try {
        // Проверяем и создаём роль "user"
        const userRole = await prisma.roles.upsert({
            where: { value: 'user' },
            update: {},
            create: { value: 'user' },
        });
        // Проверяем и создаём роль "admin"
        const adminRole = await prisma.roles.upsert({
            where: { value: 'admin' },
            update: {},
            create: { value: 'admin' },
        });
        console.log('Roles initialized:', { userRole, adminRole });
    } catch (error) {
        console.log('Error initializing roles:', error);
    }
};

const start = async() => {
    try {
        await initializeRoles(); // Инициализируем роли перед запуском сервера
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log('Error starting the server:', error);
    }
};
start();