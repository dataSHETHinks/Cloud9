import React, { useState } from 'react';
import '../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/companylogo.png';
import api from '../apiConfig';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // const handleLogin = (event) => {
  //   navigate('/dashboard');
  // }

  const handleLogin = (e) => {
    e.preventDefault();
    // localStorage.setItem("accessToken","123")
    // navigate('/');
    console.log(username)
    console.log(password)
    api('POST', '/login/',
      {
        "username": username,
        "password": password
      })
      .then((response) => {
        console.log('POST Request Response:', response);
        // localStorage.setItem("accessToken",response.access_token)
        // navigate('/');
      })
      .catch((error) => {
        console.error('POST Request Error:', error);
      });
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
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
