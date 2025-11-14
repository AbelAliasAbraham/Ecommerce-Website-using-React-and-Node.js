// middleware/auth.js (Add these logs for definitive diagnosis)

const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    console.log('DEBUG: Token is missing from Authorization header.');
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
  
  // 🚨 NEW DEBUG LOGS 🚨
  console.log('DEBUG: Received Token:', token.substring(0, 10) + '...');
  console.log('DEBUG: Backend JWT Secret Length:', process.env.JWT_SECRET.length);
  // Do NOT log the entire secret, only its length for comparison

  try {
    // This line is the critical failure point for "token failed"
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    
    console.log('DEBUG: Token Verified successfully. User ID:', decoded.id); 
    
    req.user = decoded; 
    
    next();
  } catch (err) {
    // This is the source of the "Not authorized, token failed" error
    console.error(`❌ TOKEN VERIFICATION FAILED. Reason: ${err.message}`); 
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { protect };