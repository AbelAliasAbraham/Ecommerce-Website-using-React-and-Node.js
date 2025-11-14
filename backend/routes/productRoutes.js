// backend/routes/productRoutes.js
const express = require('express');
const { getProducts, getProductById, searchProducts, createProduct } = require('../controllers/productControllers');

const router = express.Router();

// NOTE: Specific routes (like search) must come BEFORE generic routes (like /:id)

// GET /api/products/search?keyword=... 
router.get('/search', searchProducts); 

// GET /api/products/:id 
router.get('/:id', getProductById); 

// GET /api/products?category=... (Filtered list or all products)
router.get('/', getProducts); 

// POST /api/products (Requires protect/admin middleware if you add one later)
router.post('/', createProduct); 

module.exports = router;