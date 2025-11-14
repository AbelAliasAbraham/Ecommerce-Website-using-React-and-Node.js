// server/routes/userRoutes.js

const express = require('express');
// 🚨 FIX: Ensure the path to the controller is correct relative to the 'routes' folder
const { updateProfile } = require('../controllers/userControllers'); 
const { protect } = require('../middleware/auth'); 

const router = express.Router();

router.put('/profile', protect, updateProfile);

module.exports = router;