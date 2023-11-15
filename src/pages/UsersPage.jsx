import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import api from "../apiConfig";
import BaseNav from "../components/base_nav";
import DashBoardHeader from "../components/DashBoardHeader";
import profileImage from "../assets/profile.webp";

const { Column } = Table;
const { confirm } = Modal;

const UsersPage = () => {
  const [form] = Form.useForm();
  const [newUserVisible, setNewUserVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const getUserRoles = () => {
    api("GET", "/user/get_user_roles/")
      .then((response) => {
        setUserRoles(response.data);
      })
      .catch((error) => {
        console.error("GET Request Error:", error);
      });
  };

  const getAllUsers = () => {
    api("GET", "/user/get_users/", {})
      .then((response) => {
        setAllUsers(response.data.user_list);
      })
      .catch((error) => {
        console.error("GET Request Error:", error);
      });
  };

  useEffect(() => {
    getAllUsers();
    getUserRoles();
  }, []);

  const showAddUserModal = () => {
    setNewUserVisible(true);
  };

  const handleAddUserCancel = () => {
    setNewUserVisible(false);
  };

  const handleAddUserSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        api("POST", "/user/add_new_user/", values)
          .then(() => {
            getAllUsers();
            setNewUserVisible(false);
            form.resetFields();
          })
          .catch((error) => {
            console.error("POST Request Error:", error);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleDelete = (user) => {
    confirm({
      title: `Do you really want to delete ${user.username}?`,
      onOk() {
        const newStatus = !user.delete_user;
        api("POST", "/user/modify_user_status/", {
          user_id: user.id,
          delete_user: newStatus,
        })
          .then(() => {
            getAllUsers();
          })
          .catch((error) => {
            console.error("POST Request Error:", error);
          });
      },
      onCancel() {
        setUserToDelete(null);
      },
    });
  };

  return (
    <>
      <div className="dashboard-container">
        <BaseNav />
        <main className="content">
          <DashBoardHeader profileImage={profileImage} />

          <div className="user-page-div">
            <div className="child-1">
              <h1>This is Users Page</h1>
              <Button type="primary" onClick={showAddUserModal}>
                Add New User
              </Button>
            </div>
            <div className="child-2">
              <Table dataSource={allUsers} rowKey="id">
                <Column title="#" dataIndex="id" key="id" render={(text, record, index) => index + 1} />
                <Column title="Username" dataIndex="username" key="username" />
                <Column title="Email" dataIndex="email" key="email" />
                <Column
                  title="Role"
                  dataIndex="roles"
                  key="roles"
                  render={(roles) =>
                    roles.length !== 0 ? roles : <span style={{ color: "gray" }}>Not Assigned</span>
                  }
                />
                <Column title="Deleted User" dataIndex="is_deleted" key="is_deleted" render={(is_deleted) => (is_deleted ? "Yes" : "No")} />
                <Column
                  title="Delete"
                  dataIndex="delete_user"
                  key="delete_user"
                  render={(delete_user, record) => (
                    <Button disabled={record.is_deleted} onClick={() => setUserToDelete(record)}>
                      Delete
                    </Button>
                  )}
                />
              </Table>
            </div>
          </div>
        </main>

        <Modal title="Add New User" visible={newUserVisible} onCancel={handleAddUserCancel} onOk={handleAddUserSubmit}>
          <Form form={form} layout="vertical">
            <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please input the username!" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input the email!" }]}>
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input the password!" }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item label="Role" name="role" rules={[{ required: true, message: "Please select the role!" }]}>
              <Select placeholder="Select Role">
                {userRoles.map((role) => (
                  <Select.Option key={role.id} value={role.id}>
                    {role.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>

        {userToDelete && (
          <Modal
            title={`Do you really want to delete ${userToDelete.username}?`}
            visible={Boolean(userToDelete)}
            onOk={() => handleDelete(userToDelete)}
            onCancel={() => setUserToDelete(null)}
          />
        )}
      </div>
    </>
  );
};

export default UsersPage;

