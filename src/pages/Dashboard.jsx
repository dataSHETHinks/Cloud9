import React, { useState } from 'react';
import '../css/Dashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/companylogo.png';
import profileImage from '../assets/profile.webp';

function Dashboard() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate()

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        // Add your logout logic here
    };

    const handleRedirectToChangePassword = () => {
        navigate('/change-password')
    };

    const handleFileUpload = () => {
        // Add your file upload logic here
    };

    const tableData = [
        {
            Iteration: 1,
            CPUTime: 100,
            PhysTime: 80,
            Travels: 500,
            Value: 1000,
            AvValue: 950,
            MinValue: 900,
            MaxValue: 1050,
            Delta: 50,
        },
        {
            Iteration: 2,
            CPUTime: 110,
            PhysTime: 90,
            Travels: 520,
            Value: 1020,
            AvValue: 960,
            MinValue: 910,
            MaxValue: 1060,
            Delta: 60,
        },
        {
            Iteration: 3,
            CPUTime: 120,
            PhysTime: 100,
            Travels: 540,
            Value: 1040,
            AvValue: 970,
            MinValue: 920,
            MaxValue: 1070,
            Delta: 70,
        },
        {
            Iteration: 4,
            CPUTime: 100,
            PhysTime: 80,
            Travels: 500,
            Value: 1000,
            AvValue: 950,
            MinValue: 900,
            MaxValue: 1050,
            Delta: 50,
        },
        {
            Iteration: 5,
            CPUTime: 100,
            PhysTime: 80,
            Travels: 500,
            Value: 1000,
            AvValue: 950,
            MinValue: 900,
            MaxValue: 1050,
            Delta: 50,
        },
        {
            Iteration: 6,
            CPUTime: 100,
            PhysTime: 80,
            Travels: 500,
            Value: 1000,
            AvValue: 950,
            MinValue: 900,
            MaxValue: 1050,
            Delta: 50,
        },
        {
            Iteration: 7,
            CPUTime: 100,
            PhysTime: 80,
            Travels: 500,
            Value: 1000,
            AvValue: 950,
            MinValue: 900,
            MaxValue: 1050,
            Delta: 50,
        },
        {
            Iteration: 8,
            CPUTime: 100,
            PhysTime: 80,
            Travels: 500,
            Value: 1000,
            AvValue: 950,
            MinValue: 900,
            MaxValue: 1050,
            Delta: 50,
        },
    ];

    return (
        <div className="dashboard-container">
            <nav className="sidebar">
                <div className="company-info">
                    <div className="company-logo">
                        <img src={logoImage} alt="Company Logo" />
                    </div>
                    <div className="company-name">
                        <p>Fetherstill Inc</p>
                    </div>
                </div>
                <ul className="sidebar-links">
                    <li><a href="/reports">Reports</a></li>
                    <li><a href="/analytics">Analytics</a></li>
                    <li><a href="/settings">Settings</a></li>
                    <li><a href="/support">Support</a></li>
                </ul>
            </nav>
            <main className="content">
                <div className="dashboard-header">
                    <div className="profile">
                        <img src={profileImage} alt="Profile" onClick={toggleDropdown} />
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <ul>
                                    <li onClick={handleRedirectToChangePassword}>
                                        Change Password
                                    </li>
                                    <li onClick={handleLogout}>Logout</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Iteration</th>
                                <th>CPUTime</th>
                                <th>PhysTime</th>
                                <th>Travels</th>
                                <th>Value</th>
                                <th>AvValue</th>
                                <th>MinValue</th>
                                <th>MaxValue</th>
                                <th>Delta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((item) => (
                                <tr key={item.Iteration}>
                                    <td>{item.Iteration}</td>
                                    <td>{item.CPUTime}</td>
                                    <td>{item.PhysTime}</td>
                                    <td>{item.Travels}</td>
                                    <td>{item.Value}</td>
                                    <td>{item.AvValue}</td>
                                    <td>{item.MinValue}</td>
                                    <td>{item.MaxValue}</td>
                                    <td>{item.Delta}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="file-upload">
                    <input type="file" accept=".csv" onChange={handleFileUpload} />
                    <button>Upload CSV</button>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
