// src/components/CategoryNav.jsx

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const CATEGORIES = [
  { name: 'Electronics', path: '/products?category=electronics' },
  { name: 'Perfumes', path: '/products?category=perfume' },
  { name: 'Books', path: '/products?category=books' },
  { name: 'Clothing', path: '/products?category=clothing' },
];

const CategoryNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine the currently active category from the URL query
    const queryParams = new URLSearchParams(location.search);
    const activeCategory = queryParams.get('category') || 'all';

    const handleAllProductsClick = (e) => {
        e.preventDefault();
        // Navigates to /products and clears the category filter
        navigate('/products'); 
    };

    return (
        <div className="container" style={{ marginTop: '10px', marginBottom: '10px' }}>
            <div 
                style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '20px', 
                    flexWrap: 'wrap',
                    padding: '10px 0',
                    backgroundColor: '#f9f9f9', // Light background for the strip
                    borderRadius: '4px',
                    border: '1px solid #eee'
                }}
            >
                {/* Link to show ALL products (no category filter) */}
                <a 
                    href="#"
                    onClick={handleAllProductsClick}
                    style={{ 
                        textDecoration: 'none', 
                        fontWeight: activeCategory === 'all' ? 'bold' : 'normal',
                        color: activeCategory === 'all' ? '#2563eb' : '#333', // Active color
                        borderBottom: activeCategory === 'all' ? '2px solid #2563eb' : 'none',
                        paddingBottom: '2px',
                    }}
                >
                    All Products
                </a>

                {/* Category Links */}
                {CATEGORIES.map((cat) => {
                    const currentCategory = cat.path.split('=')[1]; // e.g., 'electronics'
                    const isActive = activeCategory === currentCategory;

                    return (
                        <Link 
                            key={cat.name} 
                            to={cat.path}
                            style={{ 
                                textDecoration: 'none', 
                                fontWeight: isActive ? 'bold' : 'normal',
                                color: isActive ? '#2563eb' : '#333', 
                                borderBottom: isActive ? '2px solid #2563eb' : 'none',
                                paddingBottom: '2px',
                                transition: 'color 0.1s'
                            }}
                        >
                            {cat.name}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryNav;