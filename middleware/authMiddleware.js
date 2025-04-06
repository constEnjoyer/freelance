const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.cookies.jwt; // Извлекаем токен из куки

        if (!token) {
            return res.status(401).json({ message: 'User not authorized (no token in cookies)' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log('Decoded token:', decoded);

        const userId = decoded.id;
        if (!userId) {
            return res.status(401).json({ message: 'Token does not contain id' });
        }

        req.user = { userId, roles: decoded.roles }; // Добавляем роли в req.user
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(403).json({ message: 'User not authorized (invalid token)' });
    }
};