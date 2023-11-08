import React, { useState, useEffect } from "react";
import "../css/Dashboard.css";
import { useNavigate } from "react-router-dom";
import profileImage from "../assets/profile.webp";
import "@fortawesome/fontawesome-free/css/all.min.css";
import api from "../apiConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import browseplaceholder from "../assets/browseplaceholder.jpg";
import BaseNav from "../components/base_nav";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFileDropdownOpen, setIsFileDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdown] = useState(false);
  const [allFiles, setAllFiles] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [isModuleDropdownOpen, setIsModuleDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [fileData, setFileData] = useState(null);
  const staticModules = ["Module 1", "Module 2", "Module 3"];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleFileDropdown = () => {
    setIsFileDropdownOpen(!isFileDropdownOpen);
  };

  const toggleModuleDropdown = () => {
    setIsModuleDropdownOpen(!isModuleDropdownOpen);
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdown(!isCategoryDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const handleRedirectToChangePassword = () => {
    navigate("/change-password");
  };

  const getAllFiles = () => {
    api("GET", "/data/get_file_names/", {})
      .then((response) => {
        setAllFiles(response.data.data);
      })
      .catch((error) => {
        console.error("GET Request Error:", error);
      });
  };

  const getAllCategories = () => {
    api("GET", "/data/get_file_categories/", {})
      .then((response) => {
        setAllCategories(response.data.data);
      })
      .catch((error) => {
        console.error("GET Request Error:");
      });
  };

  useEffect(() => {
    getAllFiles();
    getAllCategories();
    const openSidebarTimeout = setTimeout(() => {
      setIsSidebarOpen(true);
    }, 1500);

    return () => {
      clearTimeout(openSidebarTimeout);
    };
  }, []);

  const handleFileClick = (file) => {
    setSelectedFile(file);
    setIsFileDropdownOpen(false);
    getFileDataByFileInfo(file);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsCategoryDropdown(false);
  };

  const handleModuleClick = (module) => {
    setSelectedModule(module);
    setIsModuleDropdownOpen(false);
    getDataByModule(module);
  };
  const getDataByModule = (event) => {
    console.log("In module");
  };
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.name.split(".").pop().toLowerCase();

      const fileNameWithoutExtension = selectedFile.name.split(".")[0];

      const formData = new FormData();
      formData.append("uploaded_file", selectedFile);
      formData.append(
        "data",
        JSON.stringify({
          file_category: selectedCategory.id,
          file_name: fileNameWithoutExtension,
          file_type: fileType,
        })
      );

      api("POST", "/data/upload_file/", formData, "multipart/form-data")
        .then((response) => {
          alert(`${response.data.message}`);
          setUploadedFileName(selectedFile.name);
        })
        .catch((error) => {
          console.error("POST Request Error:", error);
        });
    }
  };

  const getFileDataByFileInfo = async (file) => {
    console.log(file);
    console.log(file.id);

    api("GET", `/data/get_file_data/?id=${file.id}`)
      .then((response) => {
        localStorage.setItem("fileData", response.data.data.data);
        setFileData(response.data.data.data);
      })
      .catch((error) => {
        console.error("POST Request Error:", error);
      });
  };

  return (
    <div className="dashboard-container">
      <BaseNav isSidebarOpen={isSidebarOpen} />
      <main className="content">
        <div className="dashboard-header">
          <div className="hamburger-icon" onClick={toggleSidebar}>
            <i className={`fas fa-bars ${isSidebarOpen ? "hidden" : ""}`}></i>
          </div>
          <div className="profile">
            <img src={profileImage} alt="Profile" onClick={toggleDropdown} />
            {isDropdownOpen && (
              <div className="pro-dropdown-menu">
                <ul>
                  <li onClick={handleRedirectToChangePassword}>
                    Change Password
                  </li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div style={{ overflowY: "auto", height: "calc(100vh - 58px)" }}>
          <div
            style={{
              marginLeft: "20px",
              marginTop: "10px",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <h3>Uploaded files:</h3>
            <div
              className="btn-group"
              style={{ marginLeft: "15px", marginTop: "5px" }}
            >
              <button
                type="button"
                className="btn btn-outline-dark btn-sm border border-dark dropdown-toggle mb-0"
                onClick={toggleFileDropdown}
              >
                {selectedFile === null ? "Select a file" : selectedFile.title}
              </button>
              <ul
                className={`dropdown-menu ${isFileDropdownOpen ? "show" : ""}`}
                style={{ backgroundColor: "white" }}
              >
                {allFiles.map((file) => (
                  <li key={file.id}>
                    <button
                      className="dropdown-item"
                      onClick={() => handleFileClick(file)}
                    >
                      {file.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            style={{
              marginLeft: "20px",
              marginTop: "10px",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <h3>Module number:</h3>
            <div
              className="btn-group"
              style={{ marginLeft: "15px", marginTop: "5px" }}
            >
              <button
                type="button"
                className="btn btn-outline-dark btn-sm border border-dark dropdown-toggle mb-0"
                onClick={toggleModuleDropdown}
              >
                {selectedModule === null
                  ? "Select a Module"
                  : selectedModule.title}
              </button>
              <ul
                className={`dropdown-menu ${
                  isModuleDropdownOpen ? "show" : ""
                }`}
                style={{ backgroundColor: "white" }}
              >
                {staticModules.map((module, index) => (
                  <li key={index}>
                    <button
                      className="dropdown-item"
                      onClick={() => handleModuleClick(module)}
                    >
                      {module}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <br />
          <div
            style={{
              marginLeft: "20px",
              marginTop: "10px",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <h3>Choose file category:</h3>
            <div
              className="btn-group"
              style={{ marginLeft: "15px", marginTop: "5px" }}
            >
              <button
                type="button"
                className="btn btn-outline-dark btn-sm border border-dark dropdown-toggle mb-0"
                onClick={toggleCategoryDropdown}
              >
                {selectedCategory === null
                  ? "Select a category"
                  : selectedCategory.name}
              </button>
              <ul
                className={`dropdown-menu ${
                  isCategoryDropdownOpen ? "show" : ""
                }`}
                style={{ backgroundColor: "white" }}
              >
                {allCategories.map((category) => (
                  <li key={category.id}>
                    <button
                      className="dropdown-item"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <br />
          <br />
          <div className="main-content">
            <div className="file-upload" style={{ marginRight: "20px" }}>
              <input
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleFileUpload}
                id="file-input"
                style={{ display: "none" }}
                disabled={!selectedCategory}
              />
              <label
                htmlFor="file-input"
                className="file-upload-label"
                style={{ cursor: "pointer" }}
              >
                <img
                  src={browseplaceholder}
                  alt="Upload File"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "80px",
                  }}
                />
                <br />
                <br />
                <h3>{uploadedFileName || "Click to upload"}</h3>
              </label>
            </div>
          </div>

          {fileData && Object.keys(fileData).length > 0 && (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    {Object.keys(fileData[1]).map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(fileData).map((key) => {
                    const item = fileData[key];
                    return (
                      <tr key={key}>
                        {Object.keys(item).map((column) => (
                          <td key={column}>{item[column]}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
