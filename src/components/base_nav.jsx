import logoImage from "../assets/companylogo.png";
import classNames from "classnames";
import "../css/sidebar/sideBar.css";

const BaseNav = (params) => {
  const { isSidebarOpen } = params;

  const sidebarClasses = classNames("sidebar", {
    closed: !isSidebarOpen,
    open: isSidebarOpen,
  });

  return (
    <nav className={sidebarClasses}>
      <div className="company-info mt-5">
        <div className="company-logo">
          <img src={logoImage} alt="Company Logo" />
          <hr className="my-2"></hr>
          <div className="company-name">
            <p>Fetherstill</p>
          </div>
        </div>
      </div>
      <hr className="my-2"></hr>
      <ul className="sidebar-links">
        <li className="mt-4">
          <a href="/reports">Files</a>
        </li>
        <li className="mt-2">
          <a href="/analytics">Users</a>
        </li>
        <li className="mt-2">
          <a href="/settings">Roles</a>
        </li>
        <li className="mt-2">
          <a href="/support">Modules</a>
        </li>
        <li className="mt-2">
          <a href="/support">Categories</a>
        </li>
      </ul>
    </nav>
  );
};

export default BaseNav;
