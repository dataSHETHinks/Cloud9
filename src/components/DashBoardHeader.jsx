import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apiConfig";

const DashBoardHeader = ({ isSidebarOpen, toggleSidebar, profileImage }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleProfileDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const navigate = useNavigate();

  const handleRedirectToChangePassword = () => {
    navigate("/change-password");
  };

  const handleLogout = () => {
    api("POST", "/logout/", {})
      .then((response) => {
        localStorage.removeItem("accessToken");
        navigate("/login/");
      })
      .catch((error) => {
        alert(error);
        console.error("Logout not successful");
      });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="dashboard-header">
      <div className="hamburger-icon mb-4" onClick={toggleSidebar}>
        <i className={`fas fa-bars ${isSidebarOpen ? "hidden" : ""}`}></i>
      </div>
      <div className="spacer"></div>{" "}
      <div className="profile mt-5" ref={profileDropdownRef}>
        <img
          className="profile"
          src={profileImage}
          alt="Profile"
          onClick={toggleDropdown}
        />
        <div
          className={`pro-dropdown-menu ${isDropdownOpen ? "open" : ""}`}
          onClick={handleProfileDropdownClose}
        >
          <ul>
            <li onClick={handleRedirectToChangePassword}>Change Password</li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardHeader;
