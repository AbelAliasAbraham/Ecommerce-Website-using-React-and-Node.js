// src/actions/cartActions.jsx

import axios from 'axios';

export const CART_ADD_ITEM = 'CART_ADD_ITEM';
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM'; // 🚨 NEW CONSTANT

/**
 * Action to add a new item to the cart (used by Product components).
 */
export const addToCart = (id, quantity) => async (dispatch) => {
    try {
        // Fetch product details
        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                // The Redux cart item structure should match the item data
                product: data._id, 
                name: data.name,
                image: data.image,
                price: parseFloat(data.price) || 0, 
                countInStock: data.countInStock,
                quantity: parseInt(quantity) || 1, 
            },
        });

    } catch (error) {
        console.error("Error adding item to cart:", error);
    }
};

/**
 * Action to remove an item from the cart.
 * @param {string} id - The product ID (item.product) to remove.
 */
export const removeFromCart = (id) => (dispatch) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id, 
    });
};