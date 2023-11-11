import logoImage from "../assets/companylogo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import classNames from "classnames";
import "../css/sidebar/sideBar.css";

const BaseNav = (params) => {
  const { isSidebarOpen } = params;

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const sidebarClasses = classNames("sidebar", {
    closed: !isSidebarOpen,
    open: isSidebarOpen,
  });

  return (
    <nav className={sidebarClasses}>
      <div className="company-info mt-5">
        <div
          className="company-logo cursor-class"
          onClick={() => handleNavigate("/")}
        >
          <img src={logoImage} alt="Company Logo" />
          <hr className="my-2"></hr>
          <div className="company-name">
            <p>Fetherstill</p>
          </div>
        </div>
      </div>
      <hr className="my-2"></hr>
      <ul className="sidebar-links">
        <li className="mt-4" onClick={() => handleNavigate("/Files")}>
          <a>Files</a>
        </li>
        <li className="mt-2" onClick={() => handleNavigate("/Users")}>
          <a>Users</a>
        </li>
        <li className="mt-2" onClick={() => handleNavigate("/Roles")}>
          <a>Roles</a>
        </li>
        <li className="mt-2" onClick={() => handleNavigate("/Modules")}>
          <a>Modules</a>
        </li>
        <li className="mt-2" onClick={() => handleNavigate("/Categories")}>
          <a>Categories</a>
        </li>
      </ul>
    </nav>
  );
};

export default BaseNav;
