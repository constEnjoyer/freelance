const router = require('express').Router();
const controller = require('../controllers/authController');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const path = require('path');

router.post('/registration', [
    check('username', 'Username cannot be empty').notEmpty(),
    check('password', 'Password must be at least 4 characters').isLength({ min: 4, max: 12 }),
], controller.registration)
router.post('/login', controller.login)
router.post('/logout', authMiddleware, controller.logout)
router.get('/users', roleMiddleware(['admin']), controller.getUsers)
router.get('/activate', controller.activateAccount)
router.post('/request-password-reset', [
    check('email', 'Email must be valid').notEmpty().isEmail(),
], controller.requestPasswordReset);


// Показывает форму для ввода нового пароля (GET)
router.get('/reset-password', (req, res) => {
    const { token } = req.query;
    if (!token) {
        return res.status(400).send('Token is required');
    }
    res.sendFile(path.join(__dirname, '../../client/reset-password.html'));
});

// Оставьте ваш POST-обработчик без изменений
router.post('/reset-password', [
    check('token', 'Token is required').notEmpty(),
    check('newPassword', 'Password must be at least 4 characters').isLength({ min: 4 }),
], controller.resetPassword);

module.exports = router;