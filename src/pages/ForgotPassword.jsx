import React, { useState, useEffect } from "react";
import "../css/ForgotPassword.css";
import logoImage from "../assets/companylogo.png";
import api from "../apiConfig";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { toast } from "react-toastify";
import AuthAPI from "../api/AuthComponentApis/AuthAPI";

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [enterCode, setEnterCode] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  useEffect(() => {}, [enterCode]);

  const callLoginApi = async (values) => {
    console.log(values);
    const result = await AuthAPI.login(username, values.code);
    console.log(result);
    if (result.success) {
      localStorage.setItem("accessToken", result.response.data.access_token);
      setIsLoading(false);
      // navigate(`/ChangePassword?username=${username}&fromForgotPassword=true`);
      navigate("/ChangePassword");
    } else {
      toast.error(result.error);
    }
  };

  const sendCode = (values) => {
    if (!values.usernameOrEmail) {
      toast.error("Please check your username or email.");
    } else {
      setEnterCode(true);
      api("POST", "user/forget_password/", {
        usernameOrEmail: values.usernameOrEmail,
      })
        .then((response) => {
          setIsLoading(false);
          toast(response.data.message);
          setEnterCode(true);
        })
        .catch((error) => {
          toast.error("POST Request Error:", error);
          setIsLoading(false);
          setEnterCode(false);
        });
    }
  };

  const handleSubmit = (values) => {
    setIsLoading(true);
    if (!enterCode) {
      setUsername(values.usernameOrEmail);
      sendCode(values);
    } else if (enterCode) {
      callLoginApi(values);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-left-side"></div>
      <div className="right-side">
        <Form
          name="basic"
          labelCol={{
            span: 24, // Setting labelCol span to full width to display labels on top
          }}
          wrapperCol={{
            span: 24, // Setting wrapperCol span to full width to display inputs on top
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          {!enterCode && (
            <Form.Item
              label="Username or Email"
              name="usernameOrEmail"
              rules={[
                {
                  required: true,
                  message: "Please input your username or email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}

          {enterCode && (
            <Form.Item
              label="Enter the Code"
              name="code"
              rules={[
                {
                  required: true,
                  message: "Please input code from your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item
            wrapperCol={{
              span: 24, // Full width for button to align it horizontally
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;
