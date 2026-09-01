const { getPresignedUploadUrl, uploadBufferToR2 } = require('../config/r2');
const Post = require('../models/Post');
const User = require('../models/User');

/**
 * Generate direct-to-R2 presigned upload URL (for React frontend)
 */
const getPresignedUrl = async (req, res) => {
  try {
    const { filename, fileType } = req.body;

    if (!filename || !fileType) {
      return res.status(400).json({ error: 'filename and fileType are required' });
    }

    const presigned = await getPresignedUploadUrl(filename, fileType);
    res.json(presigned);
  } catch (err) {
    console.error('Presign URL generation failed:', err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Upload image buffer directly to R2 and create post
 */
const uploadBufferAndCreatePost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload buffer to Cloudflare R2
    const { publicUrl } = await uploadBufferToR2(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    const user = await User.findOne({ username: req.session.passport.user });
    const post = await Post.create({
      image: publicUrl,
      imageText: req.body.filecaption || '',
      user: user._id,
    });

    user.posts.push(post._id);
    await user.save();

    res.status(201).json({
      message: 'Post created successfully',
      post,
    });
  } catch (err) {
    console.error('Buffer upload to R2 failed:', err);
    res.status(500).json({ error: 'Failed to upload image to Cloudflare R2' });
  }
};

module.exports = {
  getPresignedUrl,
  uploadBufferAndCreatePost,
};
