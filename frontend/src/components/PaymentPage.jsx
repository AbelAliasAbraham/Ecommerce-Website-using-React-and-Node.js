// src/components/ProductPage.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// 🚨 Import the addToCart action to use in the handler
import { addToCart } from '../actions/cartActions'; 

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1); 
  // 🚨 NEW STATE: For the success message/alert
  const [showAlert, setShowAlert] = useState(false); 

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
      // 1. Dispatch the global action to add the item to cart
      dispatch(addToCart(product._id, qty));
      
      // 2. 🚨 Trigger the success alert
      setShowAlert(true);
      
      // 3. Automatically hide the alert after 3 seconds
      setTimeout(() => {
          setShowAlert(false);
      }, 3000); 
    }
  };

  if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  if (error) return <div className="container" style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>Error: {error}</div>;
  if (!product) return <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>Product not found.</div>;

  return (
    <div className="container" style={{ display: 'flex', gap: '40px', padding: '20px', flexWrap: 'wrap', position: 'relative' }}>
      
      {/* 🚨 SUCCESS ALERT POP-UP */}
      {showAlert && (
          <div style={{
              position: 'fixed', // Fixed position to center it easily
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#10b981', // Emerald green color
              color: 'white',
              padding: '15px 30px',
              borderRadius: '8px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              zIndex: 100, // Ensure it's on top
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
          }}>
              ✅ {product.name} Added to Cart!
          </div>
      )}
      
      {/* Image Column */}
      <div style={{ flex: '1 1 400px' }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} 
        />
      </div>

      {/* Details Column */}
      <div style={{ flex: '1 1 400px' }}>
        <h1 style={{ marginBottom: '10px' }}>{product.name}</h1>
        <p className="price" style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '10px' }}>${product.price.toFixed(2)}</p>
        <p className="category" style={{ color: '#666' }}>Category: **{product.category || 'General'}**</p>
        <p className="description" style={{ marginTop: '20px' }}>{product.description}</p>
        <hr style={{ margin: '20px 0' }} />

        <div className="status" style={{ fontWeight: 'bold', color: product.countInStock > 0 ? '#16a34a' : '#dc2626' }}>
          Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'} (Only {product.countInStock} left!)
        </div>

        {product.countInStock > 0 && (
          <div className="cart-controls" style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
            
            <label htmlFor="qty" style={{ fontWeight: 'bold' }}>Quantity:</label>
            <select 
              id="qty"
              value={qty} 
              onChange={(e) => setQty(Number(e.target.value))} // Ensure value is a Number
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
              style={{ 
                  backgroundColor: '#f59e0b', 
                  color: 'white', 
                  padding: '10px 20px', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: 'pointer',
                  fontWeight: 'bold'
              }}
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;