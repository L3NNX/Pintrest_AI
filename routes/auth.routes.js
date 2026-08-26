const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');
const { isLoggedIn } = require('../middlewares/auth.middleware');

// Web / SSR authentication endpoints
router.post('/register', authController.register);

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
  }),
  authController.login
);

router.get('/logout', authController.logout);

// REST API endpoints
router.get('/api/auth/status', authController.getAuthStatus);
router.get('/api/me', isLoggedIn, authController.getMe);

module.exports = router;

