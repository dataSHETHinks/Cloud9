// FileUpload.jsx
import React from "react";

const FileUpload = ({
  toggleFileDropdown,
  selectedFile,
  isFileDropdownOpen,
  allFiles,
  handleFileClick,
  handleFileUpload,
  uploadedFileName,
  browseplaceholder,
  selectedCategory,
  selectedModule,
}) => {
  return (
    <>
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
    </>
  );
};

export default FileUpload;
