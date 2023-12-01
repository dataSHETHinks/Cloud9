import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import ModuleAPI from "../../api/ModuleComponentApis/ModuleAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";
import CustomLoader from "../CustomLoader";

const AddModule = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const AddModule = async (values) => {
    setIsLoading(true);
    try {
      const result = await ModuleAPI.addNewModule(values.ModuleName);
      if (result.success) {
        console.log("Module added successfully:", result.response);
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.error);
      if (error.isLogout) {
        localStorage.removeItem("accessToken");
        navigate("/login/");
      }
    }

    setIsLoading(false);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      AddModule(values);
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
          + New Module
        </Button>
      </div>
      <Modal
        title="Add New Module"
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
            label="Module Name"
            name="ModuleName"
            rules={[
              { required: true, message: "Please enter the Module name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddModule;
