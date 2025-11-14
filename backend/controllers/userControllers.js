// backend/controllers/userControllers.js (COMPLETE CODE)

const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private (Requires JWT token)
const updateProfile = async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!req.user || !req.user.id) {
      console.error('DEBUG: req.user or req.user.id is missing!');
      return res.status(401).json({ message: 'Authentication failed: User ID missing.' });
  }
  
  const user = await User.findById(req.user.id);

  if (user) {
    // 1. Update Name
    user.name = name || user.name;
    
    // 2. Update Email check
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      user.email = email;
    }

    // 3. Update Password
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    
    // 4. Save the updated user
    const updatedUser = await user.save();
    
    // Generate a new token
    // 🚨 FIX: New token expiration set to 7 days
    const token = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' }); 

    res.json({
      token,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { updateProfile };