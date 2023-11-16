import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import CategoryAPI from '../../api/CategoryComponentApis/CategoryAPI'

const AddCategory = ({ onAddCategory }) => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            onAddCategory(values);
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