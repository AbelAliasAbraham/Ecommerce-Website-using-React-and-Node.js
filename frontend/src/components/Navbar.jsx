// src/components/Navbar.jsx

import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const LOGO_SRC = 'data:image/png;base64,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';

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // States for both dropdowns
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);

  // Logout function
  const logoutHandler = () => {
    dispatch({ type: 'USER_LOGOUT' });
    setShowUserDropdown(false);
    navigate('/');
  };
  
  // Handler to close all dropdowns when navigating
  const handleNavigate = (path) => {
      setShowUserDropdown(false);
      setShowProductsDropdown(false);
      navigate(path);
  }

  // Handler to toggle the Products dropdown
  const toggleProductsDropdown = (e) => {
      e.preventDefault(); 
      setShowProductsDropdown(!showProductsDropdown);
      setShowUserDropdown(false); // Close other dropdown
  };
  
  // Effect to close dropdowns when clicking outside
  useEffect(() => {
      const closeDropdowns = (e) => {
          // Check if the click target is outside of any element with class 'dropdown-parent'
          if (e.target.closest('.dropdown-parent') === null) {
              setShowUserDropdown(false);
              setShowProductsDropdown(false);
          }
      };
      document.addEventListener('click', closeDropdowns);
      return () => document.removeEventListener('click', closeDropdowns);
  }, []); 


  return (
    <nav>
      {/* .nav-container uses display: flex and justify-content: space-between from App.css */}
      <div className="nav-container">

        {/* 1. LOGO/HOME (FAR LEFT) */}
        <Link to="/" onClick={() => handleNavigate('/')} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src={LOGO_SRC}
            alt="E-commerce Logo"
            style={{ height: '32px', width: 'auto', backgroundColor: 'white', padding: '2px', borderRadius: '4px' }}
          />
        </Link>
        
        {/* ========================================================= */}
        {/* 2. MAIN LINKS GROUP (Home, Products Dropdown & Cart Link) */}
        {/* Pushed to the right using marginLeft: 'auto' */}
        {/* ========================================================= */}
        <div 
            className="nav-links" 
            style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginLeft: 'auto', 
                marginRight: '30px' // Space before the far-right User Menu
            }}
        >
            
          {/* HOME TEXT LINK */}
          <Link 
              to="/" 
              onClick={() => handleNavigate('/')}
              style={{ marginRight: '30px' }} 
          >
              Home
          </Link>

          {/* PRODUCTS DROPDOWN MENU */}
          <div 
              className="nav-item dropdown-parent" 
              style={{ position: 'relative', marginRight: '30px' }} 
          >
              <a 
                  href="#"
                  onClick={toggleProductsDropdown}
                  style={{ color: 'white', textDecoration: 'none', cursor: 'pointer', fontWeight: 'bold' }}
              >
                  Products
              </a>

              {/* Products Dropdown Content */}
              {showProductsDropdown && (
                  <div className="dropdown-menu" style={{ 
                      position: 'absolute', 
                      top: '100%', 
                      left: '0', 
                      backgroundColor: 'white', 
                      color: '#333', 
                      minWidth: '150px', 
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
                      borderRadius: '4px', 
                      padding: '10px', 
                      zIndex: 999 
                  }}>
                      {/* Categories (All Products removed) */}
                      <Link to="/products?category=electronics" onClick={() => handleNavigate('/products?category=electronics')} style={{ display: 'block', padding: '8px 5px', color: '#333', textDecoration: 'none', borderBottom: '1px solid #eee' }}>Electronics</Link>
                      <Link to="/products?category=perfume" onClick={() => handleNavigate('/products?category=perfume')} style={{ display: 'block', padding: '8px 5px', color: '#333', textDecoration: 'none', borderBottom: '1px solid #eee' }}>Perfumes</Link>
                      <Link to="/products?category=books" onClick={() => handleNavigate('/products?category=books')} style={{ display: 'block', padding: '8px 5px', color: '#333', textDecoration: 'none', borderBottom: '1px solid #eee' }}>Books</Link>
                       <Link to="/products?category=clothing" onClick={() => handleNavigate('/products?category=clothing')} style={{ display: 'block', padding: '8px 5px', color: '#333', textDecoration: 'none' }}>Clothing</Link>
                  </div>
              )}
          </div>
          
          {/* CART LINK */}
          <Link to="/cart">🛒 </Link>
        </div>


        {/* 3. USER ACCOUNT DROPDOWN (FAR RIGHT) */}
        <div 
            className="nav-item user-menu dropdown-parent" 
            style={{ position: 'relative' }} 
        >
          {userInfo ? (
            <div onClick={() => setShowUserDropdown(!showUserDropdown)}>
              {/* User Info Block */}
              <a 
                  href="#"
                  style={{ color: 'white', textDecoration: 'none', cursor: 'pointer', fontWeight: 'bold' }}
              >
                  Hi, {userInfo.name.split(' ')[0]}
              </a>

              {/* User Dropdown Content */}
              {showUserDropdown && (
                <div 
                    className="dropdown-menu" 
                    style={{ 
                        position: 'absolute', 
                        top: '100%', 
                        right: '0', 
                        backgroundColor: 'white', 
                        color: '#333', 
                        minWidth: '200px', 
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
                        borderRadius: '4px', 
                        padding: '15px', 
                        zIndex: 999 
                    }}
                >
                  <p style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>{userInfo.name}</p>
                  <p style={{ fontSize: '0.9rem', margin: '0 0 15px 0', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>{userInfo.email}</p>
                  
                  <Link 
                    to="/account" 
                    onClick={() => handleNavigate('/account')}
                    style={{ display: 'block', marginBottom: '10px', color: '#2563eb', fontWeight: 'bold', textDecoration: 'none' }}
                  >
                    Manage Profile
                  </Link>
                  
                  <button 
                    onClick={logoutHandler}
                    style={{ 
                        background: '#dc2626', 
                        color: 'white', 
                        border: 'none', 
                        padding: '8px', 
                        borderRadius: '4px', 
                        width: '100%',
                        cursor: 'pointer'
                    }}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            // --- Logged Out View (Login Link pushed far right) ---
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;