import profileImage from "../assets/profile.webp";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BaseNav from "../components/base_nav";
import DashBoardHeader from "../components/DashBoardHeader";

const FilePage = (params) => {
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
            <h1> THis is file Page</h1>
          </div>
        </main>
      </div>
    </>
  );
};

export default FilePage;
