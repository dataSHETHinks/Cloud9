import profileImage from "../assets/profile.webp";
import BaseNav from "../components/base_nav";
import DashBoardHeader from "../components/DashBoardHeader";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/FileComponentsCss/FilePageCss.css";
import FileOverviewTable from "../components/FileComponents/FileOverviewTable";

const FilePage = (params) => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <p>Files Page</p>
    // <div className="dashboard-container">
    //   <BaseNav isSidebarOpen={isSidebarOpen} />
    //   <div className="content">
    //     <DashBoardHeader
    //       isSidebarOpen={isSidebarOpen}
    //       toggleSidebar={toggleSidebar}
    //       profileImage={profileImage}
    //       navigate={navigate}
    //     />
    //     <div className="file-page-div">
    //       <div className="child-1">
    //         <h1>This is Files Page.</h1>
    //       </div>
    //       <div className="child-2">
    //         <FileOverviewTable
    //           style={{ maxWidth: "100%", maxHeight: "73%", overflowY: "auto" }}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default FilePage;
