// src/components/ProductList.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'; 
import { fetchProductList } from '../actions/productActions'; 
// 🚨 IMPORT the reusable card component
import ProductCard from './ProductCard.jsx'; 


// --- Main Product List Component ---
const ProductList = () => {
    const dispatch = useDispatch();
    const location = useLocation(); 

    // Category filtering logic remains the same
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category'); 

    const productList = useSelector((state) => state.products);
    const { loading, error, items: products } = productList;

    useEffect(() => {
        dispatch(fetchProductList(category));
    }, [dispatch, category]); 

    return (
        <div className="product-list-container container">
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
                {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Latest Products'}
            </h1>
            
            {loading ? (
                <p style={{ textAlign: 'center' }}>Loading products...</p>
            ) : error ? (
                <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>
            ) : (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                    gap: '20px' 
                }}>
                    {/* RENDER the imported ProductCard component */}
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;