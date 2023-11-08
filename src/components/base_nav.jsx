import logoImage from '../assets/companylogo.png';

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
                    <li><a href="/settings">Settings</a></li>
                    <li><a href="/support">Support</a></li>
                </ul>
            </nav>
    )
}

export default BaseNav