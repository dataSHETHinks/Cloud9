import profileImage from "../assets/profile.webp";
import BaseNav from "../components/base_nav";
import DashBoardHeader from "../components/DashBoardHeader";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/RolesComponentsCss/RolesPageCss.css";
import ListRoles from "../components/RoleComponents/ListRoles";

const RolesPage = (params) => {
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
          <div className="role-page-div">
            <div className="role-page-child-1">
              <h1>This is Roles Page.</h1>
            </div>
            <div className="role-page-child-2">
              <h3>List of Roles</h3>
              <ListRoles />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default RolesPage;
