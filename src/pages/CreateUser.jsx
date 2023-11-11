import React, { useState, useRef, useDebugValue, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../apiConfig';
import '../css/CreateUser.css';
import BaseNav from '../components/base_nav';

function CreateUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true); // State to track password matching
  const passwordRef = useRef(); // Ref for password input
  const confirmPasswordRef = useRef(); // Ref for confirm password input
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const [isRolesDropdownOpen, setIsRolesDropdown] = useState(false);
  const [allRoles, setAllRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  const navigate = useNavigate();

  const toggleRoleDropdown = () => {
    setIsRolesDropdown(!isRolesDropdownOpen);
  };

  const getAllRoles = () => {
    api('GET', '/user/get_user_roles/', {})
        .then((response) =>{
            setAllRoles(response.data);
        })
        .catch((error) => {
            console.error('GET Request Error:',)
        });
  }

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    setIsRolesDropdown(false);
}

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
        setUsername(value);
    } else if (name === 'email'){
        setEmail(value);
    } else if (name === 'password') {
        setPassword(value);
    } else if (name === 'confirmPassword'){
        setConfirmPassword(value);
    } else if (name === 'role'){
        setSelectedRole(value);
    } 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password === confirmPassword) {
      // Passwords match, continue with your registration logic
      console.log('submitted');
      api('POST', '/user/add_new_user/',
      {
        "username": username,
        "email" : email,
        "temp_password": password,
        "role": selectedRole.id
      })
      .then((response) => {
        window.alert('Added a new user');
        navigate('/');
      })
      .catch((error) => {
        console.error('POST Request Error:', error);
      });
    } else {
      // Passwords don't match, set error and prevent registration
      setPasswordsMatch(false);
      window.alert('Passwords do not match. Please try again.');
    }
  };

  useEffect(() => {
    getAllRoles();
  }, []);

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
            <button type="button" 
                className="btn btn-outline-dark btn-sm border border-dark dropdown-toggle mb-0" 
                onClick={toggleRoleDropdown}
            >
                {selectedRole === null ? 'Select a Role' : selectedRole.title}
            </button>
            {allRoles && allRoles.length > 0 && (

            <ul className={`dropdown-menu ${isRolesDropdownOpen ? 'show' : ''}`}
                style={{ backgroundColor: 'white' }}>
                {allRoles.map((role) => (
                <li key={role.id}>
                    <button className="dropdown-item" onClick={() => handleRoleClick(role)}> 
                        {role.title}
                    </button>
                </li>
                ))}
            </ul>)}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
