// src/components/Login.jsx

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  // State to toggle between Login and Sign Up views
  const [isLoginView, setIsLoginView] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Only used for registration
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 
  const { userInfo, error } = useSelector((state) => state.user);

  // Determine where to redirect after successful login (default to home)
  const redirect = location.state?.from || '/';

  // Redirect if user is already logged in
  useEffect(() => {
    if (userInfo) navigate(redirect, { replace: true });
  }, [userInfo, navigate, redirect]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Determine the endpoint and body based on the current view
    const endpoint = isLoginView ? '/api/auth/login' : '/api/auth/register';
    const body = isLoginView 
        ? { email, password } 
        : { email, password, name };

    try {
      const { data } = await axios.post(endpoint, body);
      
      // Dispatch success action (stores token and user info)
      dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data }); 
      
      // Redirect to the intended page (e.g., /checkout)
      navigate(redirect, { replace: true });

    } catch (err) {
      // Dispatch failure with a cleaner error message
      const errorMessage = err.response?.data?.message || 'Authentication failed';
      dispatch({ type: 'USER_LOGIN_FAIL', payload: errorMessage });
    }
  };

  const handleToggle = () => {
    setIsLoginView(!isLoginView);
    // Clear state/errors when switching views
    dispatch({ type: 'USER_LOGIN_FAIL', payload: null }); 
    setEmail(''); 
    setPassword('');
    setName('');
  };

  return (
    // Uses the .checkout-container and .login-form styles from your CSS
    <div className="container checkout-container login-form">
      <h1>{isLoginView ? 'Login' : 'Sign Up'}</h1>
      
      <form onSubmit={handleSubmit}>
        
        {/* Name Field (Only for Sign Up view) */}
        {!isLoginView && (
            <div className="form-group">
                <label>Name</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
            </div>
        )}
        
        <div className="form-group">
            <label>Email</label>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
        </div>
        
        <div className="form-group">
            <label>Password</label>
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
        </div>
        
        {/* Uses the .error class from your CSS */}
        {error && <p className="error">{error}</p>} 
        
        <button type="submit">
            {isLoginView ? 'Login' : 'Sign Up'}
        </button>
      </form>
      
      {/* Toggle Link */}
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
          {isLoginView ? 'New user? ' : 'Already have an account? '}
          <span 
            onClick={handleToggle}
            style={{ color: '#2563eb', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isLoginView ? 'Create Account' : 'Login Here'}
          </span>
      </p>
    </div>
  );
};

export default Login;