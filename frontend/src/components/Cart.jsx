// src/components/Cart.jsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// Import the new action from its file
import { removeFromCart } from '../actions/cartActions'; 

// =================================================================
// 🚨 1. REDUX CONSTANTS (Match the cartActions file)
// =================================================================
const CART_ADD_ITEM = 'CART_ADD_ITEM';
const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM'; // 🚨 NEW
const CART_UPDATE_QUANTITY = 'CART_UPDATE_QUANTITY'; // Assuming you might add this later
const CART_CLEAR_ITEMS = 'CART_CLEAR_ITEMS'; // Assuming you might add this later

// =================================================================
// 🚨 2. REDUX REDUCER (EXPORTED) - UPDATED with Remove Logic
// =================================================================
// Persistence loading
const cartItemsFromStorage = localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : [];

const initialState = { 
    cartItems: cartItemsFromStorage 
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product);

            if (existItem) {
                return {
                    ...state,
                    // If item exists, replace it (this handles quantity update via addToCart too)
                    cartItems: state.cartItems.map(x => 
                        x.product === existItem.product ? item : x
                    ),
                };
            } else {
                // If item is new, add it
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }

        case CART_REMOVE_ITEM: // 🚨 NEW LOGIC
            return {
                ...state,
                // Filter out the item whose 'product' ID matches the payload ID
                cartItems: state.cartItems.filter(x => x.product !== action.payload),
            };

        case CART_CLEAR_ITEMS:
            return { cartItems: [] };
        
        // You would add logic for CART_UPDATE_QUANTITY here
        // case CART_UPDATE_QUANTITY: ...

        default:
            return state;
    }
};

// =================================================================
// 🚨 3. CART COMPONENT (UPDATED)
// =================================================================
const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);

    // --- Handlers ---
    const checkoutHandler = () => {
        // Navigate to the login page if not logged in, otherwise navigate to shipping
        // Assuming your user state is managed in Redux, you would check for userInfo here.
        navigate('/shipping'); // Direct to shipping for now
    };

    // 🚨 NEW HANDLER for removing an item
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    // --- Calculations ---
    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity) || 0;
            return acc + (price * quantity);
        }, 0);
    };

    const total = calculateTotal();

    return (
        <div className="container" style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
            <h1>Shopping Cart</h1>
            <hr style={{ marginBottom: '30px' }}/>

            {cartItems.length === 0 ? (
                <div className="error" style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fef3c7', borderRadius: '4px' }}>
                    Your cart is empty. <Link to="/" style={{ color: '#d97706', fontWeight: 'bold' }}>Go Shopping</Link>
                </div>
            ) : (
                <>
                    {/* --- Cart Item List --- */}
                    <div className="cart-item-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {cartItems.map((item) => (
                            <div 
                                key={item.product} 
                                className="cart-item"
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '80px 1fr 100px 100px 50px', // Image, Name, Qty, Price, Remove
                                    gap: '15px',
                                    alignItems: 'center',
                                    borderBottom: '1px solid #eee',
                                    paddingBottom: '15px',
                                }}
                            >
                                {/* 1. Image */}
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                                />
                                
                                {/* 2. Name Link */}
                                <Link to={`/product/${item.product}`} style={{ fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>
                                    {item.name}
                                </Link>

                                {/* 3. Quantity Display (Could be a dropdown to change qty) */}
                                <span style={{ textAlign: 'center' }}>Qty: {item.quantity}</span>
                                
                                {/* 4. Price */}
                                <span style={{ textAlign: 'right', fontWeight: 'bold' }}>${(item.price * item.quantity).toFixed(2)}</span>

                                {/* 5. Remove Button 🚨 NEW FEATURE */}
                                <button 
                                    onClick={() => removeFromCartHandler(item.product)}
                                    style={{
                                        background: '#dc2626',
                                        color: 'white',
                                        border: 'none',
                                        padding: '5px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    {/* --- Totals and Checkout --- */}
                    <div style={{ marginTop: '30px', borderTop: '2px solid #333', paddingTop: '20px' }}>
                        <h2 style={{ textAlign: 'right', marginTop: '10px' }}>
                            Subtotal ({cartItems.reduce((acc, item) => acc + (parseInt(item.quantity) || 0), 0)}) items: 
                            <span style={{ fontWeight: 'bold', marginLeft: '10px', color: '#2563eb' }}>${total.toFixed(2)}</span>
                        </h2>

                        <div style={{ textAlign: 'right', marginTop: '20px' }}>
                            <button 
                                onClick={checkoutHandler} 
                                disabled={cartItems.length === 0}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#16a34a',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}
                            >
                                Proceed To Checkout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;