const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const { isLoggedIn } = require('../middlewares/auth.middleware');

// Public feed
router.get('/api/feed', postController.getFeed);

// Create pin / post (authenticated)
router.post('/api/posts', isLoggedIn, postController.createPost);

// Like toggle (authenticated)
router.post('/api/posts/:postId/like', isLoggedIn, postController.toggleLike);

module.exports = router;

