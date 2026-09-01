const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const postRoutes = require('./post.routes');
const uploadRoutes = require('./upload.routes');

// Mount routes
router.use('/', authRoutes);
router.use('/', postRoutes);
router.use('/', uploadRoutes);

module.exports = router;
