import React, { useState } from 'react';
import '../css/ChangePassword.css';
import logoImage from '../assets/companylogo.png';
import api from '../apiConfig';
import { useLocation, useNavigate } from 'react-router-dom';

function ChangePassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
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
        setIsLoading(true);
        if (newPassword === confirmNewPassword) {
            api('POST', '/user/change_password/', {
                "password": newPassword,
                "fromForgotPassword": fromForgotPassword
            })
                .then((response) => {
                    alert(`${response.data.message}`);
                    setIsLoading(false);
                    navigate('/');
                })
                .catch((error) => {
                    console.error('POST Request Error:', error);
                    setIsLoading(false);
                });
        } else {
            alert('Passwords do not match. Please try again.');
        }
    };

    return (
        <div className="change-password-container">
            <div className="change-password-left-side">

            </div>
            <div className="change-password-right-side">
                <form onSubmit={handleSubmit} className="change-password-form">
                    <img src={logoImage} alt="Company Logo" />
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
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
                        <label htmlFor="confirmNewPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmNewPassword"
                            placeholder="Confirm Password"
                            value={confirmNewPassword}
                            onChange={handleConfirmNewPasswordChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Changing' : 'Change Password  '}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
