const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const uploadMiddleware = require('../middlewares/upload.middleware');
const { isLoggedIn } = require('../middlewares/auth.middleware');

// Generate direct-to-R2 presigned upload URL (React frontend)
router.post('/api/upload/presign', isLoggedIn, uploadController.getPresignedUrl);

// Upload multipart buffer to R2 (Legacy SSR form)
router.post(
  '/upload',
  isLoggedIn,
  uploadMiddleware.single('file'),
  uploadController.uploadBufferAndCreatePost
);

module.exports = router;

