const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');
const { isLoggedIn } = require('../middlewares/auth.middleware');

// Register endpoint
router.post('/api/auth/register', authController.register);
router.post('/register', authController.register);

// Login endpoint
router.post('/api/auth/login', passport.authenticate('local'), authController.login);
router.post('/login', passport.authenticate('local'), authController.login);

// Logout endpoint
router.get('/api/auth/logout', authController.logout);
router.get('/logout', authController.logout);

// User profile & auth status
router.get('/api/auth/status', authController.getAuthStatus);
router.get('/api/me', isLoggedIn, authController.getMe);

module.exports = router;
