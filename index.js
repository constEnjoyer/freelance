const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const authRouter = require('./routers/authRouter');
const initializeRoles = require('./config/roles');
const setupSocket = require('./socket/socketHandler');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client')));

// Routes
app.use('/api/auth', authRouter);

// Создание HTTP-сервера
const server = http.createServer(app);

// Инициализация Socket.IO
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

// Инициализация ролей и Socket.IO
const start = async() => {
    try {
        await initializeRoles(); // Инициализация ролей
        setupSocket(io); // Настройка Socket.IO
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log('Error starting the server:', error);
    }
};

start();