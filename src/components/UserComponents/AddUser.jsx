// UserAdd.js
import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import UserAPI from '../../api/UserComponentApis/UserAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import RoleAPI from '../../api/RoleComponentApis/RoleAPI';

const AddUser = () => {

  const navigate = useNavigate();
  const [newUserVisible, setNewUserVisible] = useState(false);
  const [form] = Form.useForm();
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    getUserRoles();
  }, []);

  const showAddUserModal = () => {
    setNewUserVisible(true);
  };

  const handleAddUserCancel = () => {
    setNewUserVisible(false);
  };

  const getUserRoles = async () => {
    const result = await RoleAPI.getUserRoles();
    if (result.success) {

      setUserRoles(result.response.data || []);
    } else {
      if (result.isLogout) {
        localStorage.removeItem("accessToken");
        navigate("/login/");
      } else {
        toast.error(result.error);
      }
    }
  }

  const addUsers = async (values) => {
    const result = await UserAPI.addNewUser(values.username, values.email, values.password, values.role);
    if (result.success) {
      window.location.reload();
    } else {
      if (result.isLogout) {
        localStorage.removeItem("accessToken");
        navigate("/login/");
      } else {
        toast.error(result.error);
      }
    }
  }

  const handleAddUserSubmit = async () => {
    try {
      const values = await form.validateFields();
      addUsers(values);
      form.resetFields();
      setNewUserVisible(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <div style={{ textAlign: 'left', marginRight: "20px" }}>
        <Button type="primary" size="large" style={{ width: "240px", justifyContent: "left" }} onClick={showAddUserModal}>
          + Add New User
        </Button>
      </div>

      <Modal
        title="Add New User"
        open={newUserVisible}
        onCancel={handleAddUserCancel}
        onOk={handleAddUserSubmit}
        footer={[
          <Button key="cancel" onClick={handleAddUserCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddUserSubmit} style={{ marginInlineStart: 0 }}>
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input the username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input the password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select the role!" }]}
          >
            <Select
              placeholder="Select Role"
            >
              {userRoles.map((role) => (
                <Select.Option key={role.id} value={role.id}>
                  {role.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
};

export default AddUser;
