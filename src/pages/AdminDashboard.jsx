// AdminDashboard.jsx

import React, { useState, useEffect, useRef } from "react";
import BaseNav from "../components/base_nav";
import DashBoardHeader from "../components/DashBoardHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import browseplaceholder from "../assets/browseplaceholder.jpg";
import "../css/Dashboard.css";
import { useNavigate } from "react-router-dom";
import profileImage from "../assets/profile.webp";
import "@fortawesome/fontawesome-free/css/all.min.css";
import api from "../apiConfig";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="dashboard-container">
        <BaseNav isSidebarOpen={isSidebarOpen} />
        <main className="content">
          <DashBoardHeader
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            profileImage={profileImage}
            navigate={navigate}
          />
          <div className="BodyDiv">
            <div className="left-sub-div">
              <div className="left-sub-div-child-1">
                {/* Content for the first child of the left sub-division */}
              </div>
              <div className="left-sub-div-child-2">
                {/* Content for the second child of the left sub-division */}
              </div>
            </div>
            <div className="right-sub-div">
              <div className="right-sub-div-child-1">
                {/* Content for the first child of the right sub-division */}
              </div>
              <div className="right-sub-div-child-2">
                {/* Content for the second child of the right sub-division */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminDashboard;
