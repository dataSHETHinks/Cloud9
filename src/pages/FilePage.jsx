import React, { useState, useEffect } from "react";
import { Table, Button, Modal,Select } from "antd";
import { Link } from "react-router-dom";
import api from "../apiConfig";
import AddNewFileForm from "../components/FileComponents/AddNewFileForm";


const { Option } = Select;

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
    dataIndex: "id", 
    align: "center",
    render: (id) => <Link to={`/FileDetails/${id}`}>View Details</Link>,
  },
];

const FilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allFiles, setAllFiles] = useState([]);
  const [modules, setModules] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedModule, setSelectedModule] = useState('none');
  const [selectedCategory, setSelectedCategory] = useState('none');

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleModuleChange = (value) => {
    setSelectedModule(value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleFilter = async () => {
    try {
      if (selectedModule === 'none' && selectedCategory === 'none') {
        // If both are 'None', do not apply any filters
        const response = await api("GET", "/data/get_file_names/", {});
        setAllFiles(response.data.data);
      } else {
        const moduleParam = selectedModule !== 'none' ? `module_id=${selectedModule}` : '';
        const categoryParam = selectedCategory !== 'none' ? `category_id=${selectedCategory}` : '';
        const params = [moduleParam, categoryParam].filter(Boolean).join('&');

        const response = await api("GET", `/data/filter_file_data/?${params}`);
        setAllFiles(response.data);
      }
    } catch (error) {
      console.error("GET Request Error:", error);
    }
  };

  useEffect(() => {
    // Fetch all files when the component mounts
    const getAllFiles = async () => {
      try {
        const response = await api("GET", "/data/get_file_names/", {});
        setAllFiles(response.data.data);
      } catch (error) {
        console.error("GET Request Error:", error);
      }
    };

    // Fetch modules and categories when the component mounts
    const getModulesAndCategories = async () => {
      try {
        const modulesResponse = await api("GET", "/data/get_file_modules/");
        const categoriesResponse = await api("GET", "/data/get_file_categories/");

        // Extract unique module names and category names
        const uniqueModules = modulesResponse.data.data;
        const uniqueCategories = categoriesResponse.data.data;

        setModules(uniqueModules);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("GET Request Error:", error);
      }
    };
    
    getAllFiles();
    getModulesAndCategories();
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

  // Extracting relevant data for display
  const displayData = allFiles.map(file => ({
    id: file.id,
    title: file.title,
    category_name: file.category_name,
    uploaded_by_username: file.uploaded_by_username,
    uploaded_at: new Date(file.uploaded_at).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }),
    modified_at: new Date(file.modified_at).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }),
    module_name: file.module_name,
  }));

  return (
    <div>
      <div style={{ textAlign: "right" }}>
        <Select
          style={{ width: 150, marginRight: 16 }}
          placeholder="Select Module"
          onChange={handleModuleChange}
          defaultValue="none" // Set the default value to "None"
        >
          <Option value="none">Select Module</Option>
          {modules.map((module) => (
            <Option key={module.id} value={module.id}>
              {module.name}
            </Option>
          ))}
        </Select>
        <Select
          style={{ width: 150, marginRight: 16 }}
          placeholder="Select Category"
          onChange={handleCategoryChange}
          defaultValue="none" // Set the default value to "None"
        >
          <Option value="none">Select Category</Option>
          {categories.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
        <Button type="primary"
          size="large"
          style={{ width: "200px", justifyContent: "left" }} onClick={handleFilter}>
          Filter
        </Button>
      
        </div>
        <br/>
        <div style={{ textAlign: "left" }}>
        <Button
          type="primary"
          size="large"
          style={{ width: "240px", justifyContent: "left" }}
          onClick={showModal}
        >
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
        {/* AddNewFileForm component from code1 */}
        <AddNewFileForm onSubmit={handleFileUpload} />
      </Modal>
      {allFiles && allFiles.length > 0 ? (
        <Table
          dataSource={displayData}
          columns={columns}
          scroll={{ y: 460 }}
          pagination={false}
        />
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
};

export default FilePage;