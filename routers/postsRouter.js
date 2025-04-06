const express = require('express');
const router = express.Router();
const controller = require('../controllers/postsController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware); // Только для авторизованных пользователей

router.post('/create', controller.createPost); // Создать пост
router.get('/feed', controller.getFeed); // Получить ленту событий
router.get("/search", controller.searchPosts); // Поиск постов

module.exports = router;