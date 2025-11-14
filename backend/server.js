// backend/server.js
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const path = require('path'); // Needed for serving static files

const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require('./routes/userRoutes'); 
const { errorHandler } = require('./middleware/error'); // Assume this is correct

connectDB();

const app = express();
app.use(cors()); // Allow cross-origin requests from your frontend
app.use(express.json()); // Body parser middleware

// --- File Uploads ---
// Makes the 'uploads' folder accessible via the /uploads URL
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- API Routes ---
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes); 

// --- Error Handler (MUST be last) ---
app.use(errorHandler);

const PORT = process.env.PORT || 5000; // Use a dedicated port like 5000 for backend
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));