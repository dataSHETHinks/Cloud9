// AddRole.js
import React, { useState } from 'react';
import { Button, Modal, Form, Input, Checkbox } from 'antd';
import RoleAPI from '../../api/RoleComponentApis/RoleAPI';
import { useNavigate } from 'react-router';

const AddRole = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const addRole = async (values) => {
        const title = values.title

        const clickedCheckboxesArray = values.permissions;

        const permissions = {
            "can_modify_module": false,
            "can_modify_category": false,
            "can_modify_user": false,
            "can_modify_files": false,
            "can_modify_roles": false
        };

        if (clickedCheckboxesArray) {
            clickedCheckboxesArray.forEach((key) => {
                permissions[key] = true;
            });
        }

        const result = await RoleAPI.addNewUserRole(title, permissions);
        if (result.success) {
            window.location.reload()
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
            addRole(values);
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
                    + Add User Role
                </Button>
            </div>
            <Modal
                title="Add User Role"
                open={visible}
                onCancel={handleCancel}
                onOk={handleOk}
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
                    <Form.Item
                        label="Role Title"
                        name="title"
                        rules={[{ required: true, message: 'Please enter the role title!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Permissions" name="permissions">
                        <Checkbox.Group>
                            <Checkbox style={{ width: '100%' }} value="can_modify_module">Can Modify Module</Checkbox>
                            <Checkbox style={{ width: '100%', marginLeft: "0px" }} value="can_modify_category">Can Modify Category</Checkbox>
                            <Checkbox style={{ width: '100%', marginLeft: "0px" }} value="can_modify_user">Can Modify User</Checkbox>
                            <Checkbox style={{ width: '100%', marginLeft: "0px" }} value="can_modify_files">Can Modify Files</Checkbox>
                            <Checkbox style={{ width: '100%', marginLeft: "0px" }} value="can_modify_roles">Can Modify Roles</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AddRole;
