// backend/config/db.js
// CONVERTED TO COMMONJS

const mongoose = require('mongoose'); // Replaced 'import'
const dotenv = require('dotenv'); // Replaced 'import'

dotenv.config();

const connectDB = async () => {
  try {
    // Uses the connection string from your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    // Exits the process if the connection fails (important)
    process.exit(1); 
  }
};

module.exports = connectDB; // Replaced 'export default'