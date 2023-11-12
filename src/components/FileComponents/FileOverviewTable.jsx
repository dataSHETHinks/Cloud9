// FileTable.jsx

import React, { useState, useEffect } from "react";
import api from "../../apiConfig";
import "../../css/FileComponentsCss/FileOverviewCss.css";

const FileTable = () => {
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api("GET", "/data/get_file_names/", {});
        setAllFiles(response.data.data);
      } catch (error) {
        console.error("GET Request Error:", error);
      }
    };

    fetchData();
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
          </tr>
        </thead>
        <tbody>
          {allFiles.map((file, index) => (
            <tr key={file.id}>
              <td>{index + 1}</td>
              <td>{file.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;
