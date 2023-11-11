// AdminDashboard.jsx

import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
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
import DashboardHome from "../components/DashboardHome";
import FilePage from "./FilePage";

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
            <DashboardHome />
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminDashboard;
