// FileTable.jsx

import React, { useState, useEffect } from "react";
import api from "../../apiConfig";
import { useNavigate } from "react-router-dom";
import "../../css/FileComponentsCss/FileOverviewCss.css";

const FileTable = ({ style }) => {
  const navigate = useNavigate();

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

  const handleFileDetails = async (id) => {
    api("GET", `/data/get_file_data/?id=${id}`)
      .then((response) => {
        localStorage.setItem("fileData", JSON.stringify(response.data.data));
        navigate(`/FileDetails/${id}`); // Redirect to FileDetailsPage
      })
      .catch((error) => {
        console.error("POST Request Error:", error);
      });
  };

  return (
    <div className="table-responsive" style={style}>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Modified at</th>
            <th>Uploaded By</th>
          </tr>
        </thead>
        <tbody>
          {allFiles.map((file, index) => (
            <tr key={file.id} onClick={() => handleFileDetails(file.id)}>
              <td>{index + 1}</td>
              <td>{file.title}</td>
              <td>{file.modified_at}</td>
              <td>{file.uploaded_by_username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;
