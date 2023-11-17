// DashboardHome.jsx

import React, { useEffect, useState } from "react";
import "../css/Dashboard.css";
import UserAPI from "../api/UserComponentApis/UserAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      const result = await UserAPI.getUserDetails();
      if (result.success) {
        setUser(result.response.data);
      } else {
        if (result.isLogout) {
          localStorage.removeItem("accessToken");
          navigate("/login/");
        } else {
          toast.error(result.error);
        }
      }
    };

    getUserDetails();
  }, []);

  return (
    <>
      <div className="left-sub-div">
        <div className="left-sub-div-child-1">
          <div style={{ float: "left" }}>
            {user && (
              <p style={{ fontSize: "24px" }}>Welcome, {user.username}</p>
            )}
          </div>
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
