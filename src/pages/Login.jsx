import React, { useState } from 'react';
import '../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/companylogo.png';
import api from '../apiConfig';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    api('POST', '/login/',
      {
        "username": username,
        "password": password
      })
      .then((response) => {
        localStorage.setItem("accessToken", response.data.access_token)
        setIsLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setIsLoading(false);
        alert("Please check your credentials")
        console.error('POST Request Error:', error);
      });
  }

  return (
    <div className="login-container">
      <div className="left-side">

      </div>
      <div className="right-side">
        <div className='login-form'>
      <form onSubmit={handleLogin}>
        <img src={logoImage} alt="Company Logo" />
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Username" value={username} onChange={handleInputChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={handleInputChange} required />
          </div>
          <button type="submit" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
        </form>
        <div className="forgot-password">
          <a href="/forgot-password">Forgot Password?</a>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
