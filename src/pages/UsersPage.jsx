import profileImage from "../assets/profile.webp";
import BaseNav from "../components/base_nav";
import DashBoardHeader from "../components/DashBoardHeader";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/UsersComponentsCss/UsersPageCss.css";

const UsersPage = (params) => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <p>Users Page</p>
      {/* <div className="dashboard-container">
        <BaseNav isSidebarOpen={isSidebarOpen} />
        <main className="content">
          <DashBoardHeader
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            profileImage={profileImage}
            navigate={navigate}
          />
          <div className="user-page-div">
            <div className="child-1">
              <h1>This is Users Page</h1>
            </div>
            <div className="child-2"></div>
          </div>
        </main>
      </div> */}
    </>
  );
};

export default UsersPage;
