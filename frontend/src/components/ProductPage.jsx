// src/components/ProductPage.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1); 

  const { id } = useParams(); // Gets the ID from the URL: /product/:id
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Call the new backend endpoint for a single product
        const { data } = await axios.get(`/api/products/${id}`); 
        setProduct(data);
        setLoading(false);
      } catch (err) {
        const message = err.response?.data?.message || 'Product not found.';
        setError(message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    if (product) {
      dispatch({ 
        type: 'ADD_TO_CART', 
        payload: { ...product, qty: Number(qty) } 
      });
      // Navigate to cart after adding the item
      navigate('/cart');
    }
  };

  if (loading) return <div className="container"><h2>Loading product details...</h2></div>;
  if (error) return <div className="container error"><h2>{error}</h2></div>;
  if (!product) return <div className="container"><h2>Product not available.</h2></div>;

  return (
    <div className="container product-page checkout-container"> 
      <button 
        onClick={() => navigate('/products')} 
        style={{ marginBottom: '20px', padding: '8px 15px', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        ← Back to Products
      </button>
      <div className="product-details">
        <div className="product-image-section">
          <img 
            src={product.image || 'https://via.placeholder.com/400'} 
            alt={product.name} 
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </div>
        <div className="product-info-section">
          <h1>{product.name}</h1>
          <p className="price">
            ₹{product.price.toFixed(2)}
          </p>
          <p style={{ marginTop: '5px', color: '#6b7280' }}>Category: **{product.category || 'General'}**</p>
          <p className="description" style={{ marginTop: '20px' }}>{product.description}</p>
          <hr style={{ margin: '20px 0' }} />

          <div className="status" style={{ fontWeight: 'bold', color: product.countInStock > 0 ? '#16a34a' : '#dc2626' }}>
            Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'} (Only {product.countInStock} left!)
          </div>

          {product.countInStock > 0 && (
            <div className="cart-controls">
              <label htmlFor="qty">Quantity:</label>
              <select 
                id="qty"
                value={qty} 
                onChange={(e) => setQty(e.target.value)}
                style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              >
                {[...Array(product.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
              <button 
                onClick={addToCartHandler} 
                className="add-to-cart-btn"
                style={{ backgroundColor: '#f59e0b', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;