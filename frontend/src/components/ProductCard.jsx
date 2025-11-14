// src/components/ProductCard.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// Import the action needed to add to cart
import { addToCart } from '../actions/cartActions'; 

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    
    // State for quantity
    const [quantity, setQuantity] = useState(1);
    // 🚨 State for the success message/alert
    const [showAlert, setShowAlert] = useState(false); 
    
    const handleAddToCart = () => {
        // 1. Dispatch the global action to add the item to cart
        dispatch(addToCart(product._id, quantity));

        // 2. Trigger the success alert
        setShowAlert(true);
        
        // 3. Automatically hide the alert after 3 seconds (3000 milliseconds)
        setTimeout(() => {
            setShowAlert(false);
        }, 3000); 
    };

    return (
        <div 
            key={product._id} 
            className="product-card" 
            style={{ 
                border: '1px solid #ddd', 
                padding: '15px', 
                borderRadius: '8px', 
                textAlign: 'center',
                position: 'relative', // IMPORTANT for the alert positioning
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}
        >
            {/* 🚨 SUCCESS ALERT POP-UP (Conditional Rendering) */}
            {showAlert && (
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#10b981', // Emerald green color
                    color: 'white',
                    padding: '8px 15px',
                    borderRadius: '5px',
                    fontSize: '0.9rem',
                    zIndex: 10,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                    ✅ Added to Cart!
                </div>
            )}

            <Link to={`/product/${product._id}`}>
                <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }}
                />
                <h3 style={{ fontSize: '1.2rem', margin: '10px 0 5px 0' }}>{product.name}</h3>
            </Link>
            <p style={{ color: '#2563eb', fontWeight: 'bold' }}>${product.price.toFixed(2)}</p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
                {/* Quantity Selector */}
                <select 
                    value={quantity} 
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    disabled={product.countInStock === 0}
                    style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                    {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                            {x + 1}
                        </option>
                    ))}
                </select>

                <button 
                    onClick={handleAddToCart}
                    disabled={product.countInStock === 0}
                    style={{
                        padding: '8px 15px',
                        backgroundColor: product.countInStock > 0 ? '#f59e0b' : '#9ca3af',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: product.countInStock > 0 ? 'pointer' : 'not-allowed'
                    }}
                >
                    {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;