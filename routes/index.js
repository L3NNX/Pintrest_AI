var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");
const passport = require('passport');
const upload = require("./multer");
const { uploadBufferToR2, getPresignedUploadUrl } = require('../config/r2');

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* -------------------------------------------------------------
 * SSR / EJS ROUTES (Existing Application)
 * ----------------------------------------------------------- */

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/login', function (req, res, next) {
  res.render('login', { error: req.flash('error') });
});

router.get('/feed', function (req, res, next) {
  res.render('feed');
});

router.post('/upload', isLoggedIn, upload.single('file'), async function (req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).send("No files were given"); 
    }

    // Upload image buffer directly to Cloudflare R2
    const { publicUrl } = await uploadBufferToR2(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    const user = await userModel.findOne({ username: req.session.passport.user });
    const post = await postModel.create({
      image: publicUrl,
      imageText: req.body.filecaption || '',
      user: user._id
    });

    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
  } catch (error) {
    console.error("Upload to R2 failed:", error);
    res.status(500).send("Failed to upload image to Cloudflare R2");
  }
});

router.get('/profile', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user
  }).populate("posts");
  res.render("profile", { user });
});

router.post("/register", function (req, res) {
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname });

  userModel.register(userData, req.body.password)
    .then(function () {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    })
    .catch(function (err) {
      res.redirect("/");
    });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true,
}), function (req, res) {});

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

/* -------------------------------------------------------------
 * REST API ENDPOINTS (For React Frontend & Direct R2 Uploads)
 * ----------------------------------------------------------- */

// Generate a direct-to-R2 presigned upload URL
router.post('/api/upload/presign', isLoggedIn, async function (req, res) {
  try {
    const { filename, fileType } = req.body;
    if (!filename || !fileType) {
      return res.status(400).json({ error: "filename and fileType are required" });
    }
    const presigned = await getPresignedUploadUrl(filename, fileType);
    res.json(presigned);
  } catch (err) {
    console.error("Presign error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Create a post from an already-uploaded R2 URL
router.post('/api/posts', isLoggedIn, async function (req, res) {
  try {
    const { image, imageText } = req.body;
    if (!image || !imageText) {
      return res.status(400).json({ error: "image and imageText are required" });
    }
    const user = await userModel.findOne({ username: req.session.passport.user });
    const post = await postModel.create({
      image,
      imageText,
      user: user._id,
    });
    user.posts.push(post._id);
    await user.save();
    res.status(201).json({ post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get global pins feed
router.get('/api/feed', async function (req, res) {
  try {
    const posts = await postModel.find()
      .populate('user', 'username fullname dp')
      .sort({ createdAt: -1 });
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get current user profile and pins
router.get('/api/me', isLoggedIn, async function (req, res) {
  try {
    const user = await userModel.findOne({ username: req.session.passport.user })
      .populate('posts');
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Auth status check
router.get('/api/auth/status', function (req, res) {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, username: req.session.passport.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  if (req.path.startsWith('/api/')) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.redirect("/login");
}

module.exports = router;
