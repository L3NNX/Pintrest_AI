/**
 * Authentication Guard Middleware
 * Returns 401 JSON error for unauthorized requests
 */
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized: Please log in' });
};

module.exports = {
  isLoggedIn,
};
