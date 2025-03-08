// Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      navigate('/maincomponent');
    }
  }, [navigate]);

  // Check for remembered credentials
  useEffect(() => {
    const remembered = localStorage.getItem('rememberedUser');
    if (remembered) {
      const { email, password } = JSON.parse(remembered);
      setFormData(prev => ({
        ...prev,
        email,
        password,
        rememberMe: true
      }));
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === formData.email);
  
      if (!user || user.password !== formData.password) {
        setError('Invalid email or password');
        return;
      }
  
      // Handle remember me
      if (formData.rememberMe) {
        localStorage.setItem('rememberedUser', JSON.stringify({
          email: formData.email,
          password: formData.password
        }));
      } else {
        localStorage.removeItem('rememberedUser');
      }
  
      // Set authentication state
      localStorage.setItem('currentUser', JSON.stringify({
        ...user,
        lastLogin: new Date().toISOString()
      }));
  
      // Redirect to dashboard or main component
      navigate('/dashboard'); // Change `/gallery` to `/dashboard`
    } catch (err) {
      setError('An error occurred during login');
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-checkbox">
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Remember me
            </label>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="register-link">
          Don't have an account? <span onClick={() => navigate('/register')}>Register here</span>
        </p>
      </div>
    </div>
  );
};
export default Login;