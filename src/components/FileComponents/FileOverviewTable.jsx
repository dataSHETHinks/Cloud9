// FileTable.jsx

import React, { useState, useEffect } from "react";
import api from "../../apiConfig";
import "../../css/FileComponentsCss/FileOverviewCss.css";

const FileTable = () => {
  const [allFiles, setAllFiles] = useState([]);

  const getAllFiles = () => {
    api("GET", "/data/get_file_names/", {})
      .then((response) => {
        setAllFiles(response.data.data);
      })
      .catch((error) => {
        console.error("GET Request Error:", error);
      });
  };
  useEffect(() => {
    getAllFiles();
  }, []); // Fetch data on component mount

  return (
    <div
      className="table-responsive"
      style={{ maxHeight: "85%", overflowY: "auto" }}
    >
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Uploaded By</th>
            <th>Modified At</th>
            <th>Module Name</th>
          </tr>
        </thead>
        <tbody>
          {allFiles.map((file, index) => (
            <tr key={file.id}>
              <td>{index + 1}</td>
              <td>{file.title}</td>
              <td>{file.category_name}</td>
              <td>{file.uploaded_by_username}</td>
              <td>{file.modified_at}</td>
              <td>{file.module_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;
