// src/actions/productActions.jsx

import axios from 'axios';

// --- Constants (Must match constants in store.jsx) ---
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAIL = 'FETCH_PRODUCTS_FAIL';


/**
 * Thunk action to fetch the list of all products from the backend,
 * optionally filtered by category.
 * @param {string} [category=''] - The category name to filter by.
 */
// 🚨 MODIFIED: Added category parameter
export const fetchProductList = (category = '') => async (dispatch) => {
    try {
        dispatch({ type: FETCH_PRODUCTS_REQUEST });

        // 🚨 MODIFIED: Construct URL with category query parameter if provided
        // If category is 'electronics', the URL becomes /api/products?category=electronics
        const url = category ? `/api/products?category=${category}` : '/api/products';
        
        const { data } = await axios.get(url);

        dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};