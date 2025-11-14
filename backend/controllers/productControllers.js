const Product = require('../models/Product'); 

// @desc    Fetch all products, optionally filtered by category
// @route   GET /api/products?category=...
const getProducts = async (req, res) => {
  try {
    const { category } = req.query; 
    let filter = {};

    if (category) {
      // Filter by category using a case-insensitive regex
      filter = { category: { $regex: category, $options: 'i' } };
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching products', details: err.message });
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); 

        if (product) {
          res.json(product);
        } else {
          res.status(404).json({ message: 'Product not found' });
        }
      } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Product not found (Invalid ID format)' });
        }
        res.status(500).json({ message: 'Server error fetching product', details: err.message });
      }
};

// @desc    Search products by keyword (unchanged logic)
const searchProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {};
    const products = await Product.find({ ...keyword });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new product
const createProduct = async (req, res) => {
  try {
    // Ensure 'category' is included in destructuring
    const { name, price, description, image, countInStock, category } = req.body; 
    
    const product = new Product({ name, price, description, image, countInStock, category }); 
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    res.status(500).json({ message: 'Server error', details: err.message }); 
  }
};

module.exports = { 
  getProducts, 
  getProductById, // Exported the new controller
  searchProducts, 
  createProduct 
};