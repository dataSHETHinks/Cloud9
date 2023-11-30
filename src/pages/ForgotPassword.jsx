import React, { useState, useEffect } from "react";
import "../css/ForgotPassword.css";
import logoImage from "../assets/companylogo.png";
import api from "../apiConfig";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { toast } from "react-toastify";
import AuthAPI from "../api/AuthComponentApis/AuthAPI";
import CustomLoader from "../components/CustomLoader";
import "../App.css";

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
    setIsLoading(true);
    try {
      const result = await AuthAPI.login(username, values.code);
      if (result.success) {
        localStorage.setItem("accessToken", result.response.data.access_token);
        navigate("/ChangePassword");
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

  const sendCode = (values) => {
    if (!values.usernameOrEmail) {
      toast.error("Please check your username or email.");
    } else {
      setIsLoading(true);
      setEnterCode(true);
      api("POST", "user/forget_password/", {
        usernameOrEmail: values.usernameOrEmail,
      })
        .then((response) => {
          toast(response.data.message);
          setEnterCode(true);
        })
        .catch((error) => {
          if (error.code === "ERR_NETWORK") {
            toast.error(
              "Server did not respond. Contact admin or try again later."
            );
          } else if (error.response.status === 404) {
            toast.error("User not found. Please check your username or email.");
          } else {
            toast.error("Something went wrong. Please check with admin.");
          }
          setEnterCode(false);
        });
    }
    setIsLoading(false);
  };

  const handleSubmit = (values) => {
    if (!enterCode) {
      setUsername(values.usernameOrEmail);
      sendCode(values);
    } else if (enterCode) {
      callLoginApi(values);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="centered-loader">
          <CustomLoader />
        </div>
      ) : null}
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
    </>
  );
}

export default ForgotPassword;
