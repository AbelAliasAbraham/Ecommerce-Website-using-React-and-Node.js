// Signup.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Assuming you have an 'error' state for registration failure in your user reducer
    const { userInfo, error } = useSelector((state) => state.user); 

    useEffect(() => {
        if (userInfo) navigate('/');
    }, [userInfo, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Note: The register endpoint requires name, email, and password
            const { data } = await axios.post('/api/auth/register', { name, email, password });
            
            // Dispatch success action (using the same structure as login for token/user info)
            dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data }); 
            navigate('/');

        } catch (err) {
            // Dispatch a generic error if registration fails
            const errorMessage = err.response?.data?.message || 'Registration failed';
            dispatch({ type: 'USER_LOGIN_FAIL', payload: errorMessage });
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-md">
            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                
                <button 
                    type="submit" 
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full transition-colors"
                >
                    Register
                </button>
                
                <p className="mt-4 text-center text-sm">
                    Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;