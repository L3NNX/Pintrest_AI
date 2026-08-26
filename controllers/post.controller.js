const Post = require('../models/Post');
const User = require('../models/User');

/**
 * Fetch global feed sorted by newest
 */
const getFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username fullname dp')
      .sort({ createdAt: -1 });

    res.json({ posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Create a new pin/post from an uploaded image URL
 */
const createPost = async (req, res) => {
  try {
    const { image, imageText } = req.body;

    if (!image || !imageText) {
      return res.status(400).json({ error: 'Image URL and caption are required' });
    }

    const user = await User.findOne({ username: req.session.passport.user });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const post = await Post.create({
      image,
      imageText,
      user: user._id,
    });

    user.posts.push(post._id);
    await user.save();

    res.status(201).json({
      message: 'Post created successfully',
      post,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Toggle like on a pin
 */
const toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const user = await User.findOne({ username: req.session.passport.user });

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const userIndex = post.likes.indexOf(user._id);
    if (userIndex === -1) {
      post.likes.push(user._id);
    } else {
      post.likes.splice(userIndex, 1);
    }

    await post.save();
    res.json({
      likesCount: post.likes.length,
      isLiked: userIndex === -1,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getFeed,
  createPost,
  toggleLike,
};

