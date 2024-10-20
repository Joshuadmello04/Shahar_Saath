const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth'); // Optional: Auth middleware if you want to protect the route

// GET /api/profile - Get user profile
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/profile - Update profile image only
router.put('/', authMiddleware, async (req, res) => {
  const { profileImage } = req.body; // Get the image from request body

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage }, // Update only the profile image
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;