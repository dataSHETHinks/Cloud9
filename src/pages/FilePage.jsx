import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import { Link } from "react-router-dom";
import api from "../apiConfig";
import AddNewFileForm from "../components/FileComponents/AddNewFileForm";

const columns = [
  {
    title: "#",
    dataIndex: "index",
    key: "index",
    align: "center",
    render: (text, record, index) => index + 1,
  },
  {
    title: "Title",
    dataIndex: "title",
    align: "center",
    sorter: (a, b) => a.title.localeCompare(b.title),
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Category",
    dataIndex: "category_name",
    align: "center",
    sorter: (a, b) => a.category_name.localeCompare(b.category_name),
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Uploaded By",
    dataIndex: "uploaded_by_username",
    align: "center",
    sorter: (a, b) =>
      a.uploaded_by_username.localeCompare(b.uploaded_by_username),
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Uploaded At",
    dataIndex: "uploaded_at",
    align: "center",
    sorter: (a, b) => new Date(a.uploaded_at) - new Date(b.uploaded_at),
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Modified At",
    dataIndex: "modified_at",
    align: "center",
    sorter: (a, b) => new Date(a.modified_at) - new Date(b.modified_at),
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Module",
    dataIndex: "module_name",
    align: "center",
    sorter: (a, b) => a.module_name.localeCompare(b.module_name),
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Action",
    dataIndex: "id", // Assuming 'id' is the unique identifier for files
    align: "center",
    render: (id) => <Link to={`/FileDetails/${id}`}>View Details</Link>,
  },
];

const FilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allFiles, setAllFiles] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getAllFiles = async () => {
      try {
        const response = await api("GET", "/data/get_file_names/", {});
        setAllFiles(response.data.data);
      } catch (error) {
        console.error("GET Request Error:", error);
      }
    };

    getAllFiles();
  }, []);

  const handleFileUpload = (values, selectedFile) => {
    const { title, category, module, fileType } = values;

    if (selectedFile) {
      const fileTypeToSend = fileType.toLowerCase();

      const formData = new FormData();
      formData.append("uploaded_file", selectedFile);
      formData.append("file_category", category);
      formData.append("file_module", module);
      formData.append("file_name", title);
      formData.append("file_type", fileTypeToSend);

      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]); // Check formData contents
      }

      api("POST", "/data/upload_file/", formData, "multipart/form-data")
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("POST Request Error:", error);
        });
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'left' }}>
        <Button type="primary" size="large" style={{ width: "240px", justifyContent: "left" }} onClick={showModal}>
          + Add a New File
        </Button>
      </div>
      <Modal
        title="Add a New File"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <AddNewFileForm onSubmit={handleFileUpload} />
      </Modal>
      <Table
        dataSource={allFiles}
        columns={columns}
        scroll={{ y: 460 }}
        pagination={false}
      />
    </div>
  );
};

export default FilePage;
