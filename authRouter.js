const router = require('express').Router();
const controller = require('./authController');
const { check } = require('express-validator');
const authMiddleware = require('./middleware/authMiddleware');
const roleMiddleware = require('./middleware/roleMiddleware');

router.post('/registration', [
    check('username', 'Username cannot be empty').notEmpty(),
    check('password', 'Password must be at least 4 characters').isLength({ min: 4, max: 12 }),
], controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['admin']), controller.getUsers)
router.get('/activate', controller.activateAccount)

module.exports = router;