import React, { useState } from 'react';
import '../css/ForgotPassword.css';
import logoImage from '../assets/companylogo.png';

function ForgotPassword() {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Password reset request for username: ${username}`);
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <img src={logoImage} alt="Logo" />
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
