// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // Style the footer with inline styles (or move them to App.css)
    <footer 
      style={{
        backgroundColor: '#333',
        color: 'white',
        padding: '20px 0',
        marginTop: '50px', // Add some space above the footer
        width: '100%',
      }}
    >
      <div 
        className="container" 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          fontSize: '0.9rem',
        }}
      >
        {/* 1. Copyright Section */}
        <div style={{ padding: '10px' }}>
          <p>&copy; {new Date().getFullYear()} E-commerce Store. All rights reserved.</p>
        </div>

        {/* 2. Navigation Links */}
        <div style={{ padding: '10px' }}>
          <h4 style={{ marginBottom: '10px', fontSize: '1rem', color: '#f59e0b' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '5px' }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
            </li>
            <li style={{ marginBottom: '5px' }}>
              <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Shop All</Link>
            </li>
            <li style={{ marginBottom: '5px' }}>
              <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>Cart</Link>
            </li>
            <li style={{ marginBottom: '5px' }}>
              <Link to="/account" style={{ color: 'white', textDecoration: 'none' }}>My Account</Link>
            </li>
          </ul>
        </div>
        
        {/* 3. Contact Info/Socials Placeholder */}
        <div style={{ padding: '10px' }}>
          <h4 style={{ marginBottom: '10px', fontSize: '1rem', color: '#f59e0b' }}>Contact Us</h4>
          <p>Email: support@ecommerce.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;