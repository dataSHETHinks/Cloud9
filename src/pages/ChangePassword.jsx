import React, { useState } from 'react';
import '../css/ChangePassword.css';
import logoImage from '../assets/companylogo.png';
import api from '../apiConfig';
import { useLocation, useNavigate } from 'react-router-dom';

function ChangePassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const fromForgotPassword = queryParams.get('fromForgotPassword');

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmNewPasswordChange = (event) => {
        setConfirmNewPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newPassword === confirmNewPassword) {
            api('POST', '/user/change_password/', {
                "password": newPassword,
                "fromForgotPassword": fromForgotPassword
            })
                .then((response) => {
                    alert(`${response.data.message}`);
                    navigate('/');
                })
                .catch((error) => {
                    console.error('POST Request Error:', error);
                });
        } else {
            alert('Passwords do not match. Please try again.');
        }
    };

    return (
        <div className="change-password-container">
            <form onSubmit={handleSubmit} className="change-password-form">
                <div className="change-password-company-info">
                    <img src={logoImage} alt="Company Logo" />
                    <p>Fetherstill Inc</p>
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        id="newPassword"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        id="confirmNewPassword"
                        placeholder="Confirm Password"
                        value={confirmNewPassword}
                        onChange={handleConfirmNewPasswordChange}
                        required
                    />
                </div>
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
}

export default ChangePassword;
