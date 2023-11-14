// DashboardHome.jsx

import React from "react";
import "../css/Dashboard.css";
import FileOverviewTable from "./FileComponents/FileOverviewTable.jsx";

const DashboardHome = () => {
  return (
    <>
      <div className="left-sub-div">
        <div className="left-sub-div-child-1">
          <h1>Home</h1>
          {/* Content for the first child of the left sub-division */}
        </div>
        <div className="left-sub-div-child-2">
          {/* <FileOverviewTable
            style={{ maxWidth: "100%", maxHeight: "87%", overflowY: "auto" }}
          /> */}
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
    </>
  );
};

export default DashboardHome;
