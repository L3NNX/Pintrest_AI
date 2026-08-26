const passport = require('passport');
const User = require('../models/User');

const localStrategy = require('passport-local');
passport.use(new localStrategy(User.authenticate()));

/**
 * Register a new user
 */
const register = (req, res) => {
  const { username, email, fullname, password } = req.body;

  if (!username || !email || !fullname || !password) {
    if (req.xhr || req.path.startsWith('/api/')) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    return res.redirect('/');
  }

  const userData = new User({ username, email, fullname });

  User.register(userData, password)
    .then((registeredUser) => {
      passport.authenticate('local')(req, res, () => {
        if (req.xhr || req.path.startsWith('/api/')) {
          return res.status(201).json({
            message: 'User registered successfully',
            user: {
              id: registeredUser._id,
              username: registeredUser.username,
              fullname: registeredUser.fullname,
              email: registeredUser.email,
            },
          });
        }
        res.redirect('/profile');
      });
    })
    .catch((err) => {
      if (req.xhr || req.path.startsWith('/api/')) {
        return res.status(400).json({ error: err.message });
      }
      res.redirect('/');
    });
};

/**
 * Handle user login
 */
const login = (req, res) => {
  if (req.xhr || req.path.startsWith('/api/')) {
    return res.json({
      message: 'Logged in successfully',
      user: {
        id: req.user._id,
        username: req.user.username,
        fullname: req.user.fullname,
        email: req.user.email,
      },
    });
  }
  res.redirect('/profile');
};

/**
 * Handle user logout
 */
const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    if (req.xhr || req.path.startsWith('/api/')) {
      return res.json({ message: 'Logged out successfully' });
    }
    res.redirect('/');
  });
};

/**
 * Get current authenticated user profile
 */
const getMe = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.session.passport.user })
      .populate('posts')
      .select('-hash -salt');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Check authentication status
 */
const getAuthStatus = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      isAuthenticated: true,
      username: req.session.passport.user,
    });
  }
  res.json({ isAuthenticated: false });
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  getAuthStatus,
};

