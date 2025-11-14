// src/components/AccountPage.jsx

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 🚨 MODAL Component (Defined locally for simplicity)
const AccountModal = ({ userInfo, onClose, onLogout }) => {
    return (
        // 1. Modal Overlay (covers the entire screen)
        <div 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark semi-transparent background
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000, // Ensure it's on top of everything
            }}
            onClick={onClose} // Close modal when clicking the backdrop
        >
            {/* 2. Modal Content Box (small square window) */}
            <div 
                style={{ 
                    backgroundColor: '#fff', 
                    padding: '30px', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                    maxWidth: '350px', // Small square size
                    width: '90%',
                    position: 'relative',
                }}
                onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the box
            >
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    style={{ 
                        position: 'absolute', 
                        top: '10px', 
                        right: '10px', 
                        background: 'none', 
                        border: 'none', 
                        fontSize: '1.5rem', 
                        cursor: 'pointer',
                        color: '#aaa'
                    }}
                >
                    &times;
                </button>

                <h3 style={{ marginBottom: '20px', color: '#2563eb' }}>Account Details</h3>
                
                <p style={{ marginBottom: '10px' }}>
                    <strong>Name:</strong> {userInfo.name}
                </p>
                <p style={{ marginBottom: '20px' }}>
                    <strong>Email:</strong> {userInfo.email}
                </p>
                
                {/* Logout Button */}
                <button 
                    onClick={onLogout} 
                    style={{ 
                        backgroundColor: '#dc2626', // Red color for logout
                        color: 'white',
                        width: '100%', 
                        padding: '10px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};


const AccountPage = () => {
  const { userInfo } = useSelector((state) => state.user); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null); 
  
  // 🚨 CHANGE: State now controls the visibility of the MODAL
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      setName(userInfo.name || '');
      setEmail(userInfo.email || '');
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const updateData = { name, email };
      if (password) { updateData.password = password; }
      
      const config = { headers: { 'Content-Type': 'application/json' } };

      const { data } = await axios.put('/api/users/profile', updateData, config);

      dispatch({ type: 'USER_UPDATE_SUCCESS', payload: data.user }); 
      
      setMessage('Profile Updated Successfully!');
      setPassword('');
      setConfirmPassword('');

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Profile update failed';
      setMessage(errorMessage);
    }
  };
  
  // 🚨 Logout Handler (Called from the Modal)
  const logoutHandler = () => {
    dispatch({ type: 'USER_LOGOUT' }); 
    navigate('/'); 
  };


  if (!userInfo) return null; 

  return (
    <div className="container checkout-container"> 
      <h1>My Account</h1>
      
      {/* Status Message */}
      {message && (
          <p 
              className={message.includes('Success') ? 'success' : 'error'}
              style={{ marginBottom: '15px' }}
          >
              {message}
          </p>
      )}

      {/* 🚨 MODAL TRIGGER BUTTON */}
      <button 
        onClick={() => setIsModalOpen(true)} // Open the modal
        style={{ 
            marginTop: '10px', 
            marginBottom: '30px', 
            width: 'auto', 
            padding: '10px 20px',
            backgroundColor: '#2563eb' 
        }}
      >
        View Account Details & Logout
      </button>

      {/* 🚨 MODAL RENDERING */}
      {isModalOpen && (
        <AccountModal
            userInfo={userInfo}
            onClose={() => setIsModalOpen(false)}
            onLogout={logoutHandler}
        />
      )}

      {/* 2. Profile Update Form (Remains the same) */}
      <h3>Update Profile</h3>
      <form onSubmit={submitHandler}>
        
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <h4 style={{ fontSize: '1.2rem', margin: '20px 0 10px 0' }}>Change Password (Optional)</h4>
        
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter new password'
          />
        </div>
        
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm new password'
          />
        </div>

        <button type="submit" style={{ width: '100%' }}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default AccountPage;