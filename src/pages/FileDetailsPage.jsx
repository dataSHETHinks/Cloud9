// FileDetails.jsx
import profileImage from "../assets/profile.webp";
import BaseNav from "../components/base_nav";

import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";
import DashBoardHeader from "../components/DashBoardHeader";
import "../css/Dashboard.css";
import "../css/FileComponentsCss/FileDetailsPageCss.css";

const FileDetailsPage = () => {
  const navigate = useNavigate();

  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    // Retrieve the fileData from localStorage during component initialization
    const storedFileData = localStorage.getItem("fileData");

    if (storedFileData) {
      // Parse the JSON data if it's stored as a string
      const parsedFileData = JSON.parse(storedFileData);
      // Set the file data in the state
      setFileData(parsedFileData);
    }
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-container">
      <BaseNav isSidebarOpen={isSidebarOpen} />
      <div className="content">
        <DashBoardHeader
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          profileImage={profileImage}
          navigate={navigate}
        />
        <div className="file-details-page-div">
          {fileData ? (
            <>
              <div
                className="child-1"
                style={{
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
                  {fileData.title}
                </h2>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <li style={{ marginRight: "20px" }}>
                    <strong>Category:</strong> {fileData.category_name}
                  </li>
                  <li style={{ marginRight: "20px" }}>
                    <strong>Uploaded by:</strong>{" "}
                    {fileData.uploaded_by_username}
                  </li>
                  <li style={{ marginRight: "20px" }}>
                    <strong>Uploaded at:</strong> {fileData.uploaded_at}
                  </li>
                  <li>
                    <strong>Modified at:</strong> {fileData.modified_at}
                  </li>
                </ul>
              </div>
              <div className="child-2">
                <div
                  className="table-responsive"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "580px",
                    minHeight: "50%",
                    overflowY: "auto",
                  }}
                >
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        {fileData.data &&
                          Object.keys(fileData.data[1]).map((key) => (
                            <th key={key}>{key}</th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(fileData.data).map((iteration) => (
                        <tr key={iteration}>
                          {Object.keys(fileData.data[iteration]).map((key) => (
                            <td key={key}>{fileData.data[iteration][key]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="child-1">
              <p>No file data available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileDetailsPage;
