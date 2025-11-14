// src/components/SearchBar.jsx

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

// 🚨 UPDATED: Mock data for the offer banners, using placeholder image paths
const OFFER_BANNERS = [
  { 
    id: 1, 
    // You should place this file in your public/images folder: /public/images/electronics-sale.jpg
    image: '/public/electronics-sale.jpg', 
    url: '/products?category=electronics' 
  },
  { 
    id: 2, 
    // You should place this file in your public/images folder: /public/images/new-collection.jpg
    image: '/public/new-collection.jpg', 
    url: '/products?category=clothing' 
  },
  { 
    id: 3, 
    // You should place this file in your public/images folder: /public/images/free-shipping.jpg
    image: '/public/free-shipping.jpg', 
    url: '/products' 
  },
  { 
    id: 4, // 🚨 NEW ITEM
    image: '/public/perfume-offer.jpg',  
    url: '/products?category=perfume' 
  },
];


const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();

  const handleSearch = async () => {
    dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
    try {
      const { data } = await axios.get(`/api/products/search?keyword=${keyword}`);
      dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'FETCH_PRODUCTS_FAIL', payload: 'Search failed' });
    }
  };

  return (
    <div className="container" style={{ padding: '0 15px' }}>
        
      {/* 1. Original Search Bar Container */}
      <div className="search-bar" style={{ display: 'flex', gap: '10px', padding: '10px 0' }}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search products..."
          onKeyPress={(e) => {
              if (e.key === 'Enter') handleSearch();
          }}
          style={{ flexGrow: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button 
            onClick={handleSearch} 
            style={{ 
                padding: '10px 15px', 
                backgroundColor: '#f59e0b', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
            }}
        >
          Search
        </button>
      </div>

      {/* 2. Offer Banner Section with Images */}
      <div 
        className="offer-banners" 
        style={{ 
          display: 'flex', 
          overflowX: 'scroll', // Enables horizontal scrolling
          gap: '15px', 
          paddingBottom: '15px', 
          marginTop: '5px',
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none',  /* IE and Edge */
        }}
      >
        {OFFER_BANNERS.map((offer) => (
          <a 
            key={offer.id} 
            href={offer.url} // Link to the offer page
            style={{
              flex: '0 0 auto', 
              minWidth: '280px', // Fixed width for each banner
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              overflow: 'hidden', 
              textDecoration: 'none', 
              display: 'block', 
              lineHeight: '0', 
            }}
          >
            {/* 🚨 Uses the image path from the OFFER_BANNERS array */}
            <img 
                src={offer.image} 
                alt={offer.alt} 
                style={{ 
                    width: '100%', 
                    height: 'auto', 
                    display: 'block'
                }} 
            />
          </a>
        ))}
      </div>
      
    </div>
  );
};

export default SearchBar;