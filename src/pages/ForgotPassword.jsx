import React, { useState } from 'react';
import '../css/ForgotPassword.css';
import logoImage from '../assets/companylogo.png';
import api from '../apiConfig';
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const callLoginApi = (resetCode) => {
    api('POST', '/login/', {
      "username": username,
      "password": resetCode
    })
      .then((response) => {
        const accessToken = response.data.access_token;

        localStorage.setItem('accessToken', accessToken);

        navigate(`/change-password?username=${username}&fromForgotPassword=true`);
      })
      .catch((error) => {
        console.error('POST Request Error:', error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    api('POST', 'user/forget_password/',
      {
        "usernameOrEmail": username
      })
      .then((response) => {
        // TODO : Check with status code
        alert(`Your rest password code is ${response.data.code}`)
        callLoginApi(response.data.code)
      })
      .catch((error) => {
        console.error('POST Request Error:', error);
      });
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <div className="forgot-password-company-info">
          <img src={logoImage} alt="Company Logo" />
          <p>Fetherstill Inc</p>
        </div>
        <div className="input-group">
          <input
            type="name"
            id="name"
            name="name"
            placeholder='Username'
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
