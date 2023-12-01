// UserList.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import { toast } from 'react-toastify';
import UserAPI from '../../api/UserComponentApis/UserAPI';
import { useNavigate } from 'react-router';

const { Column } = Table;
const { confirm } = Modal;

const UserList = (params) => {

  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);

  const getAllUsers = async () => {
    const result = await UserAPI.getUserList();
    if (result.success) {
      console.log(result);
      setAllUsers(result.response.data.user_list || []);
    } else {
      if (result.isLogout) {
        localStorage.removeItem("accessToken");
        navigate("/login/");
      } else {
        toast.error(result.error);
      }
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDelete = async (user) => {
    confirm({
      title: `Do you really want to delete ${user.username}?`,
      onOk: async () => {
        try {
          const newStatus = !user.delete_user;
          const result = await UserAPI.modifyUserStatus(user.id, newStatus);
          // Check the result or handle it as needed
          window.location.reload();
          getAllUsers();
        } catch (error) {
          console.error("Error modifying user status:", error);
        } finally {
          setUserToDelete(null);
        }
      },
      onCancel() {
        setUserToDelete(null);
      },
      cancelButtonProps: {
        style: { color: "#333", marginInlineStart: 0 },
      },
      okButtonProps: {
        style: { marginInlineStart: 0 },
      },
      okText: 'Delete',
    });
  };


  return (
    <div>
      <div className="table-container" style={{ border: '0px' }}>
        <Table
          dataSource={allUsers}
          rowKey="id"
          scroll={{ y: window.innerHeight - 300 }}
          pagination={false}
        >
          <Column
            title="#"
            dataIndex="id"
            key="id"
            render={(text, record, index) => index + 1}
          />
          <Column
            title="Username"
            dataIndex="username"
            key="username"
            align='center'
          />
          <Column
            title="Email"
            dataIndex="email"
            key="email"
            align='center'
          />
          <Column
            title="Role"
            dataIndex="roles"
            key="roles"
            align='center'
            render={(roles) =>
              roles && roles.length > 0 ? (<div>
                {roles.map((role, index) => (
                  <span key={index}>
                    {role.title}
                    <br />
                  </span>
                ))}
              </div>) : <span style={{ color: "red" }}>Not Assigned</span>
            }
          />
          <Column
            title="Deleted User"
            align='center'
            dataIndex="is_deleted"
            key="is_deleted"
            render={(is_deleted) => (is_deleted ? "Yes" : "No")}
          />
          <Column
            title="Delete"
            dataIndex="delete_user"
            key="delete_user"
            align='center'
            render={(delete_user, record) => (
              <Button
                disabled={record.is_deleted}
                onClick={() => handleDelete(record)}
                className={`custom-delete-button${record.is_deleted ? ' disabled' : ''}`}
                style={!record.is_deleted ? { background: '#ffffff', border: '1px solid' } : {}}
              >
                Delete
              </Button>
            )}
          />
        </Table>
      </div>
    </div>
  );
};

export default UserList;
