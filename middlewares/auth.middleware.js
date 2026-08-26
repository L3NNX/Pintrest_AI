/**
 * Authentication Guard Middleware
 * Redirects unauthenticated web requests to /login
 * Returns 401 JSON error for API requests
 */
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  
  if (req.path.startsWith('/api/') || req.xhr) {
    return res.status(401).json({ error: 'Unauthorized: Please log in' });
  }

  res.redirect('/login');
};

module.exports = {
  isLoggedIn,
};

