import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../apiConfig';
import '../css/CreateUser.css';
import BaseNav from '../components/base_nav';

function CreateUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true); // State to track password matching
  const passwordRef = useRef(); // Ref for password input
  const confirmPasswordRef = useRef(); // Ref for confirm password input
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name + ' ' + value);
    if (name === 'username') {
        setUsername(value);
    } else if (name === 'email'){
        console.log("IN email")
        setEmail(value);
    } else if (name === 'password') {
        setPassword(value);
    } else if (name === 'confirmPassword'){
        setConfirmPassword(value);
    } else if (name === 'role'){
        setRole(value);
    } 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password === confirmPassword) {
      // Passwords match, continue with your registration logic
      console.log('submitted');
      // Add your registration logic here
    } else {
      // Passwords don't match, set error and prevent registration
      setPasswordsMatch(false);
      window.alert('Passwords do not match. Please try again.');
    }
  };

  return (
    <div className="registration-container">
        <BaseNav isSidebarOpen={isSidebarOpen}/>
      <div className="right-side">
        <h1>Add New User</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
              ref={passwordRef}
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              required
              ref={confirmPasswordRef}
            />
          </div>
          <div className="input-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a role</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="Data Engineer">Data Engineer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
              <option value="Operator">Operator</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
