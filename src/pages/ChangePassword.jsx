import React from "react";
import "../css/ChangePassword.css";
import api from "../apiConfig";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { toast } from "react-toastify";

function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get("username");
  const fromForgotPassword = queryParams.get("fromForgotPassword");

  const handleSubmit = (values) => {
    if (values.newPassword === values.confirmNewPassword) {
      api("POST", "/user/change_password/", {
        password: values.confirmNewPassword,
        fromForgotPassword: fromForgotPassword === "true" ? true : false,
      })
        .then((response) => {
          toast(`${response.data.message}`);
          navigate("/");
        })
        .catch((error) => {
          console.error("POST Request Error:", error);
        });
    } else {
      toast.error("Passwords do not match. Please try again.");
    }
  };

  return (
    <Form
      name="basic"
      initialValues={{
        remember: true,
        username: username || "",
      }}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Password"
        name="newPassword"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmNewPassword"
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ChangePassword;
