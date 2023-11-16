import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import api from "../apiConfig";
import BaseNav from "../components/base_nav";
import '../css/UsersComponentsCss/UsersPageCss.css';


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

  let isConfirming = false; // Add this flag

const handleDelete = (user) => {
  console.log(isConfirming);
  if (isConfirming) {
    return; // If already confirming, do nothing
  }

    isConfirming = true;

  confirm({
    title: `Do you really want to delete ${user.username}?`,
    onOk() {
      const newStatus = !user.delete_user;
      api("POST", "/user/modify_user_status/", {
        user_id: user.id,
        delete_user: newStatus,
      })
        .then(() => {
          window.location.reload();
          getAllUsers();
        })
        .catch((error) => {
          console.error("POST Request Error:", error);
        })
        .finally(() => {
          setUserToDelete(null);
          isConfirming = false; // Reset the flag
        });
    },
    onCancel() {
      setUserToDelete(null);
      isConfirming = false; // Reset the flag
    },
    cancelButtonProps: { // Optional: Customize cancel button props
      style: { color: '#333' }, // Change cancel button text color
    },
  });
};

  return (
    <>
      <div className="dashboard-container">
        <BaseNav />
        <main className="content">

          <div className="user-page-div">
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button  type="primary"
                       size="large"
                       style={{ width: '15%', backgroundColor: '#1890ff', marginRight: '16px' }}
                       onClick={showAddUserModal}
              >
                Add New User
              </Button>
            </div>
            <div>
              <div className="table-container"  style={{border:'0px'}}>
                <Table dataSource={allUsers} rowKey="id" scroll={{ y: 470 }}  pagination={{ pageSize: 10 }}>
                  <Column title="#" dataIndex="id" key="id" render={(text, record, index) => index + 1}  />
                  <Column title="Username" dataIndex="username" key="username" align='center' />
                  <Column title="Email" dataIndex="email" key="email" align='center'/>
                  <Column
                    title="Role"
                    dataIndex="roles"
                    key="roles"
                    align='center'
                    render={(roles) =>
                      roles.length !== 0 ? roles : <span style={{ color: "gray" }}>Not Assigned</span>
                    }
                  />
                  <Column title="Deleted User" align='center' dataIndex="is_deleted" key="is_deleted" render={(is_deleted) => (is_deleted ? "Yes" : "No")} />
                  <Column
                    title="Delete"
                    dataIndex="delete_user"
                    key="delete_user"
                    align='center'
                    render={(delete_user, record) => (
                      <Button disabled={record.is_deleted} onClick={() => setUserToDelete(record)}  className={`custom-delete-button${record.is_deleted ? ' disabled' : ''}`}>
                        Delete
                      </Button>
                    )}
                  />
                </Table>
              </div>
            </div>
          </div>
        </main>

        <Modal title="Add New User" visible={newUserVisible} onCancel={handleAddUserCancel} onOk={handleAddUserSubmit}
         footer={[
          <Button key="cancel" onClick={handleAddUserCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddUserSubmit} style={{marginInlineStart:0}}>
            Submit
          </Button>,
          ]}
        >
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
        {userToDelete && handleDelete(userToDelete)}

        {/* {userToDelete && (
          <Modal
            title={`Do you really want to delete ${userToDelete.username}?`}
            visible={Boolean(userToDelete)}
            onOk={() => handleDelete(userToDelete)}
            onCancel={() => setUserToDelete(null)}
          />
        )} */}
      </div>
    </>
  );
};

export default UsersPage;
