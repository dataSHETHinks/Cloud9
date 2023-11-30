// AddRole.js
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Checkbox, Select } from 'antd';
import RoleAPI from '../../api/RoleComponentApis/RoleAPI';
import { useNavigate } from 'react-router';
import UserAPI from '../../api/UserComponentApis/UserAPI';

const AssignedChangeUserRole = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [allRoles, setAllRoles] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    const getAllUsers = async () => {
        const result = await UserAPI.getUserList();
        if (result.success) {
            setAllUsers(result.response.data.user_list)
        } else {
            if (result.isLogout) {
                localStorage.removeItem("accessToken");
                navigate("/login/");
            } else {
                alert(result.error);
            }
        }
    }

    const getAllRoles = async () => {
        const result = await RoleAPI.getUserRoles();
        if (result.success) {
            setAllRoles(result.response.data)
        } else {
            if (result.isLogout) {
                localStorage.removeItem("accessToken");
                navigate("/login/");
            } else {
                alert(result.error);
            }
        }
    }

    useEffect(() => {
        getAllUsers();
        getAllRoles();
    }, [])



    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const changeAssignedUserRole = async (values) => {
        console.log(values)
        const result = await RoleAPI.changeAssignedUserRole(values.User, values.role);
        if (result.success) {
            alert("User role changed successfully")
        } else {
            if (result.isLogout) {
                localStorage.removeItem("accessToken");
                navigate("/login/");
            } else {
                alert(result.error);
            }
        }
    }

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            changeAssignedUserRole(values);
            form.resetFields();
            setVisible(false);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <div style={{ textAlign: 'left' }}>
                <Button type="primary" size="large"
                    style={{ width: "240px", justifyContent: "left" }} onClick={showModal}>
                    Change User Role
                </Button>
            </div>
            <Modal
                title="Changed Assigned User Role"
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk} style={{ marginInlineStart: 0 }}>
                        Submit
                    </Button>,
                ]}
            >
                <Form form={form}>
                    <Form.Item label="User" name="User" rules={[{ required: true, message: "Please select the role!" }]}>
                        <Select placeholder="Select User">
                            {allUsers.map((user) => (
                                <Select.Option key={user.id} value={user.id}>
                                    {user.username}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Role" name="role" rules={[{ required: true, message: "Please select the role!" }]}>
                        <Select placeholder="Select Role">
                            {allRoles.map((role) => (
                                <Select.Option key={role.id} value={role.id}>
                                    {role.title}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AssignedChangeUserRole;
