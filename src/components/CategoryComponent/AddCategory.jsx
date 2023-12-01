import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import CategoryAPI from "../../api/CategoryComponentApis/CategoryAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";
import CustomLoader from "../CustomLoader";

const AddCategory = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const addCategory = async (values) => {
    try {
      const result = await CategoryAPI.addNewCategory(values.CategoryName);
      if (result.success) {
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.error);
      if (error.isLogout) {
        localStorage.removeItem("accessToken");
        navigate("/login/");
      }
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      addCategory(values);
      form.resetFields();
      setVisible(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="centered-loader">
          <CustomLoader />
        </div>
      ) : null}
      <div style={{ textAlign: "left" }}>
        <Button
          type="primary"
          size="large"
          style={{ width: "240px", justifyContent: "left" }}
          onClick={showModal}
        >
          + New Category
        </Button>
      </div>
      <Modal
        title="Add New Category"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            style={{ marginInlineStart: 0 }}
          >
            Submit
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item
            label="Category Name"
            name="CategoryName"
            rules={[
              { required: true, message: "Please enter the Category name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddCategory;
