import React, { useEffect, useState } from "react";
import { Form, Input, Select, Radio, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import api from "../../apiConfig";

const { Option } = Select;

const AddNewFileForm = ({ onSubmit }) => {
  const [allCategories, setAllCategories] = useState([]);
  const [allModules, setAllModules] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    getAllCategories();
    getAllModules();
  }, []);

  const getAllCategories = () => {
    api("GET", "/data/get_file_categories/", {})
      .then((response) => {
        setAllCategories(response.data.data);
      })
      .catch((error) => {
        console.error("GET Request Error:", error);
      });
  };

  const getAllModules = () => {
    api("GET", "/data/get_file_modules/", {})
      .then((response) => {
        setAllModules(response.data.data);
      })
      .catch((error) => {
        console.error("GET Request Error:", error);
      });
  };

  const onFinish = (values) => {
    // Handle form submission with all form values including the selected file
    console.log("Form values:", values);
    console.log("Selected file:", selectedFile);

    if (selectedFile) {
      onSubmit(values, selectedFile); // Call the onSubmit function provided by props
    }
    // Rest of your form submission logic
  };

  const handleFileChange = (e) => {
    // Store the selected file without triggering form submission
    setSelectedFile(e.target.files[0]);
  };

  return (
    <Form
      name="addNewFileForm"
      onFinish={onFinish}
      initialValues={{ fileType: "CSV" }} // Set default file type if needed
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input the title!" }]}
      >
        <Input placeholder="Enter title" />
      </Form.Item>
      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: "Please select a category!" }]}
      >
        <Select placeholder="Select category">
          {allCategories.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Module"
        name="module"
        rules={[{ required: true, message: "Please select a module!" }]}
      >
        <Select placeholder="Select module">
          {allModules.map((module) => (
            <Option key={module.id} value={module.id}>
              {module.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Type of File" name="fileType">
        <Radio.Group>
          <Radio value="CSV">CSV</Radio>
          <Radio value="XLSX">XLSX</Radio>
        </Radio.Group>
      </Form.Item>

      <input type="file" onChange={handleFileChange} />

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Upload
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddNewFileForm;
