import React, { useState, useEffect, useRef } from "react";
import "../css/Dashboard.css";
import { useNavigate } from "react-router-dom";
import profileImage from "../assets/profile.webp";
import "@fortawesome/fontawesome-free/css/all.min.css";
import api from "../apiConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import browseplaceholder from "../assets/browseplaceholder.jpg";
import BaseNav from "../components/base_nav";
import DashBoardHeader from "../components/DashBoardHeader";
import FileAPI from "../api/FileComponentApis/FileApi";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFileDropdownOpen, setIsFileDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdown] = useState(false);
  const [allFiles, setAllFiles] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allModules, setAllModules] = useState([]);
  const [isModuleDropdownOpen, setIsModuleDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [fileData, setFileData] = useState(null);

  const profileDropdownRef = useRef(null);

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

  // const handleLogout = () => {
  //   localStorage.removeItem("accessToken");
  //   navigate("/login");
  // };

  const handleRedirectToChangePassword = () => {
    navigate("/change-password");
  };

  const getAllFiles = async () => {
    const result = await FileAPI.listAllFiles();
    if (result.success) {
      setAllFiles(result.response.data.data);
    } else {
      if (result.isLogout) {
        // Redirect to logout or login page
        console.log(result.error.response.data.error)
        localStorage.removeItem("accessToken");
        navigate("/login/")
      } else {
        console.log(result.error.response.data.error)
      }
      console.error("POST Request Error:", result.error);
    }
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

  // Function to close the profile dropdown
  const closeProfileDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(event.target)
    ) {
      closeProfileDropdown();
    }
  };

  useEffect(() => {
    getAllFiles();
    getAllCategories();
    const openSidebarTimeout = setTimeout(() => {
      setIsSidebarOpen(true);
    }, 1500);

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      clearTimeout(openSidebarTimeout);
    };
  }, []);

  const handleLogout = () => {
    api("POST", "/logout/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({}),
    })
      .then((response) => {
        localStorage.removeItem("accessToken");
        navigate("/login/");
      })
      .catch((error) => {
        alert("Error");
        console.error("Logout not successful");
      });
  };
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
      formData.append("file_category", selectedCategory.id);
      formData.append("file_name", fileNameWithoutExtension);
      formData.append("file_type", fileType);

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

  const getAllModules = () => {
    api("GET", "data/get_file_modules/", {})
      .then((response) => {
        setAllModules(response.data.data);
      })
      .catch((error) => {
        console.error("GET Request Error:", error);
      });
  };

  // Dynamic category left
  const addCategory = () => {
    api("POST", "data/add_new_category/", {
      name: "test-category-1",
    })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        alert("POST Request Error:", error);
      });
  };

  // Dynamic module left
  const addModule = () => {
    api("POST", "data/add_new_module/", {
      name: "test-module",
    })
      .then((response) => {
        alert(response.message);
      })
      .catch((error) => {
        alert("POST Request Error:", error);
      });
  };

  useEffect(() => {
    getAllFiles();
    getAllCategories();
    getAllModules();
  }, []);

  const handleProfileDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="dashboard-container">
      <BaseNav isSidebarOpen={isSidebarOpen} />
      <main className="content">
        <DashBoardHeader
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          profileImage={profileImage}
          toggleDropdown={toggleDropdown}
          isDropdownOpen={isDropdownOpen}
          handleProfileDropdownClose={handleProfileDropdownClose}
          handleRedirectToChangePassword={handleRedirectToChangePassword}
          handleLogout={handleLogout}
          profileDropdownRef={profileDropdownRef}
        />
        {/* <button onClick={addCategory}>Add Category</button>
        <button onClick={addModule}>Add Module</button> */}
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
            <h3>Module:</h3>
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
                  : selectedModule.name}
              </button>
              <ul
                className={`dropdown-menu ${isModuleDropdownOpen ? "show" : ""
                  }`}
                style={{ backgroundColor: "white" }}
              >
                {allModules.map((module) => (
                  <li key={module.id}>
                    <button
                      className="dropdown-item"
                      onClick={() => handleModuleClick(module)}
                    >
                      {module.name}
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
                className={`dropdown-menu ${isCategoryDropdownOpen ? "show" : ""
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
          <div className="main-content">
            <div className="file-upload" style={{ marginRight: "20px" }}>
              <input
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleFileUpload}
                id="file-input"
                style={{ display: "none" }}
                disabled={!selectedCategory || !selectedModule}
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
        {/* <div className="BodyDiv"></div>; */}
      </main>
    </div>
  );
}

export default Dashboard;
