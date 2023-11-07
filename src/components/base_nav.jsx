import logoImage from '../assets/companylogo.png';
import CreateUser from '../pages/CreateUser';
import { Link } from 'react-router-dom';
const BaseNav = (params) => {
    const {isSidebarOpen} = params
    return (
        <nav className="sidebar" style={isSidebarOpen ? {} : { display: 'none' }}>
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
                    <li><Link to="/create-user">Create New User</Link></li>
                    <li><a href="/settings">Settings</a></li>
                    <li><a href="/support">Support</a></li>
                </ul>
            </nav>
    )
}

export default BaseNav