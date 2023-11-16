import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import CategoryAPI from '../../api/CategoryComponentApis/CategoryAPI'
import { useNavigate } from 'react-router-dom';

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
            console.log('Category added successfully:', result.response);
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
            console.log(values)
            addCategory(values);
            form.resetFields();
            setVisible(false);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                + New Category
            </Button>
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