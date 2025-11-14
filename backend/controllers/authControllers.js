// backend/controllers/authControllers.js (COMPLETE CODE)

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

const register = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Valid email is required').isEmail(),
  check('password', 'Password must be 6+ characters').isLength({ min: 6 }),
  
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { email, password, name } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ email, password: hashedPassword, name, cart: [] });
      await user.save();

      // 🚨 FIX: Token expiration set to 7 days
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' }); 
      res.json({ token, user: { id: user._id, email, name } });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error during registration' });
    }
  }
];

const login = [
  check('email', 'Valid email is required').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      // 🚨 FIX: Token expiration set to 7 days
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error during login' });
    }
  }
];

module.exports = { register, login };