const express = require('express');
const User = require('../models/User.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const router = express.Router();

// Get paginated users
router.get('/', authMiddleware, async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  try {
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Update failed' });
  }
});

// Delete user
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Deletion failed' });
  }
});

module.exports = router;