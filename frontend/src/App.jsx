// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';         
import Home from './components/Home.jsx';             
import ProductList from './components/ProductList.jsx'; 
import Cart from './components/Cart.jsx';             
import SearchBar from './components/SearchBar.jsx';
import Login from './components/Login.jsx'; 
import Checkout from './components/Checkout.jsx';
import AccountPage from './components/AccountPage.jsx'; 
import ProductPage from './components/ProductPage.jsx';
import Footer from './components/Footer.jsx'; 
import CategoryNav from './components/CategoryNav.jsx'; 
import ShippingPage from './components/ShippingPage.jsx'; // 🚨 NEW
import PaymentPage from './components/PaymentPage.jsx';     
import Signup from './components/Signup.jsx';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      {/* Structural layout components */}
      <Navbar />
      <SearchBar />
      <CategoryNav /> 
      
      {/* Main content wrapper */}
      <div className="main-content-wrapper" style={{ minHeight: 'calc(100vh - 150px)', padding: '20px 0' }}>
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductPage />} /> {/* NEW: Product Detail */}
            <Route path="/cart" element={<Cart />} />
            
            {/* User/Auth Pages */}
            <Route path="/login" element={<Login />} /> 
            <Route path="/signup" element={<Signup />} /> {/* Uses a dedicated component or a toggle in Login.jsx */}
            <Route path="/account" element={<AccountPage />} /> 

            {/* Checkout Flow (Sequential) */}
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/checkout" element={<Checkout />} /> {/* The final review/place order step */}

            {/* Default/404 Route */}
            <Route path="*" element={<Home />} /> 
          </Routes>
      </div>
      
      <Footer /> 
    </BrowserRouter>
  );
};

export default App;