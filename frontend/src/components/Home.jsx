// src/components/Home.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductList from './ProductList.jsx'; 
import { fetchProductList } from '../actions/productActions'; 
// 🚨 IMPORT the reusable card component
import ProductCard from './ProductCard.jsx'; 

const Home = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  // Fetch all products when component mounts
  useEffect(() => {
    dispatch(fetchProductList()); 
  }, [dispatch]);

  // Select the first 4 products to feature
  const FEATURED_PRODUCTS = items.slice(0, 4); 

  return (
    <div className="container">
      <div className="home-hero" style={{ textAlign: 'center', marginBottom: '40px', padding: '40px', background: '#f0f4f8', borderRadius: '8px' }}>
        <h1>Welcome to the E-commerce Store!</h1>
        <p style={{ fontSize: '1.1rem', color: '#555', marginTop: '10px' }}>
          Discover our curated selection of top-quality products.
        </p>
        <Link 
            to="/products" 
            style={{ 
                display: 'inline-block', 
                marginTop: '20px', 
                padding: '10px 20px', 
                backgroundColor: '#f59e0b', 
                color: 'white', 
                textDecoration: 'none', 
                borderRadius: '4px', 
                fontWeight: 'bold' 
            }}
        >
            Shop All Products
        </Link>
      </div>

      {/* --- Featured Products Section --- */}
      <h2 style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>
        Featured Products
      </h2>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading featured products...</p>
      ) : error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>
      ) : (
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px',
            marginBottom: '50px' 
        }}>
          {/* 🚨 Use ProductCard here to get the alert feature */}
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      
    </div>
  );
};

export default Home;