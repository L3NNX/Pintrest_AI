const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isLoggedIn } = require('../middlewares/auth.middleware');

// Home / Register page
router.get('/', (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/profile');
  res.render('index');
});

// Login page
router.get('/login', (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/profile');
  res.render('login', { error: req.flash('error') });
});

// Static feed page
router.get('/feed', (req, res) => {
  res.render('feed');
});

// User profile page
router.get('/profile', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.session.passport.user,
    }).populate('posts');
    res.render('profile', { user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

