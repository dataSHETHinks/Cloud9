import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import CategoryAPI from '../../api/CategoryComponentApis/CategoryAPI'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddCategory = () => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const addCategory = async (values) => {
        const result = await CategoryAPI.addNewCategory(values.CategoryName);
        if (result.success) {
            window.location.reload()
        } else {
            if (result.isLogout) {
                localStorage.removeItem("accessToken");
                navigate("/login/");
            } else {
                toast.error(result.error);
            }
        }
    }

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            addCategory(values);
            form.resetFields();
            setVisible(false);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <div style={{ textAlign: 'left' }}>
                <Button type="primary" size='large' style={{ width: "240px", justifyContent: "left" }} onClick={showModal}>
                    + New Category
                </Button>
            </div>
            <Modal
                title="Add New Category"
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form}>
                    <Form.Item
                        label="Category Name"
                        name="CategoryName"
                        rules={[{ required: true, message: 'Please enter the Category name!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AddCategory;