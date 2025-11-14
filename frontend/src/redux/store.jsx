// src/redux/store.jsx 

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; 
import { composeWithDevTools } from '@redux-devtools/extension'; 
import axios from 'axios'; 

// 🚨 IMPORT REDUCERS from their respective files
import { cartReducer } from "../components/Cart.jsx"; 
// You must create productReducer and userReducer in a separate file (e.g., productReducers.js, userReducers.js)
// For now, they are defined below as placeholders.

// =================================================================
// 1. PERSISTENCE LOADING
// =================================================================

// Load user info and token
const tokenFromStorage = localStorage.getItem('token') || null;
const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null;

// The cartReducer loads its own state, but we include it here for the overall initialState structure
const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

// =================================================================
// 2. INITIAL STATE
// =================================================================

const initialState = {
    // Product List State
    products: { items: [], loading: false, error: null },
    
    // Single Product Detail State
    productDetails: { loading: false, product: {} }, 

    // User/Auth State
    user: { 
        userInfo: userInfoFromStorage,
        token: tokenFromStorage, // Attach the token here
        error: null 
    },
    
    // Cart State is typically handled entirely by the imported cartReducer
    cart: { 
        cartItems: cartItemsFromStorage, 
        // total field can be calculated on load in the cartReducer or component
    }, 
};

// =================================================================
// 3. PLACEHOLDER REDUCERS (Define these in separate files for clean code)
// =================================================================

// Product List Reducer
const productReducer = (state = initialState.products, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCTS_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_PRODUCTS_SUCCESS':
            // Assumes payload is an array of products
            return { loading: false, items: action.payload, error: null };
        case 'FETCH_PRODUCTS_FAIL':
            return { loading: false, error: action.payload, items: [] };
        default:
            return state;
    }
};

// Single Product Detail Reducer
const productDetailReducer = (state = initialState.productDetails, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCT_DETAIL_REQUEST':
            return { loading: true, product: {} };
        case 'FETCH_PRODUCT_DETAIL_SUCCESS':
            return { loading: false, product: action.payload };
        case 'FETCH_PRODUCT_DETAIL_FAIL':
            return { loading: false, error: action.payload, product: {} };
        default:
            return state;
    }
};


// User/Auth Reducer
const userReducer = (state = initialState.user, action) => {
    switch (action.type) {
        // Shared logic for both successful login and registration
        case 'USER_LOGIN_SUCCESS':
        case 'USER_REGISTER_SUCCESS':
            // Save token and user info to localStorage on success (not shown here, but typically done in the action)
            return { ...state, userInfo: action.payload.user, token: action.payload.token, error: null };
        case 'USER_LOGOUT':
            // Clear all user data
            return { userInfo: null, token: null, error: null };
        case 'USER_LOGIN_FAIL':
        case 'USER_REGISTER_FAIL':
            return { ...state, userInfo: null, token: null, error: action.payload };
        // Profile update (only updates userInfo, token remains the same)
        case 'USER_UPDATE_PROFILE_SUCCESS':
            return { ...state, userInfo: action.payload.user, error: null };
        default:
            return state;
    }
};

// =================================================================
// 4. COMBINE REDUCERS & CREATE STORE
// =================================================================

const rootReducer = combineReducers({
    products: productReducer,
    productDetails: productDetailReducer, // For ProductPage.jsx
    cart: cartReducer, // Imported from Cart.jsx
    user: userReducer
});

const middleware = [thunk];
const enhancer = composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(
    rootReducer, 
    initialState, 
    enhancer
);

// =================================================================
// 5. AXIOS INTERCEPTOR (GLOBAL AUTH)
// =================================================================

/**
 * 🔑 This interceptor checks the store for the JWT token and attaches it to 
 * the Authorization header of every request that leaves the frontend.
 */
axios.interceptors.request.use(
    (config) => {
        // Get the current token from the Redux store state
        const token = store.getState().user.token; 

        if (token) {
            // Attach the token as a Bearer token
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default store;