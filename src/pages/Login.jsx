import React, { useState } from 'react';
import '../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/companylogo.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isAuthenticated = true;

    if (isAuthenticated) {
      navigate('/dashboard'); // Navigate to the dashboard
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-company-info">
          <img src={logoImage} alt="Company Logo" />
          <p>Fetherstill Inc</p>
        </div>
        <div className="input-group">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
