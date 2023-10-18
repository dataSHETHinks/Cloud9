import React, { useState } from 'react';
import '../css/ChangePassword.css';
import logoImage from '../assets/companylogo.png';

function ChangePassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmNewPasswordChange = (event) => {
        setConfirmNewPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add password change logic here
        if (newPassword === confirmNewPassword) {
            // Passwords match, perform password change
            alert('Password changed successfully!');
        } else {
            // Passwords do not match, show an error
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
