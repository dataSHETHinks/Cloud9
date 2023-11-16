import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import ModuleAPI from '../../api/ModuleComponentApis/ModuleAPI'
import { useNavigate } from 'react-router-dom';

const AddModule = () => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const AddModule = async (values) => {
        const result = await ModuleAPI.addNewModule(values.ModuleName);
        if (result.success) {
            console.log('Module added successfully:', result.response);
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
            AddModule(values);
            form.resetFields();
            setVisible(false);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <div style={{ textAlign: 'left' }}>
                <Button type="primary" size="large" style={{ width: "240px", justifyContent: "left" }} onClick={showModal}>
                    + New Module
                </Button>
            </div>
            <Modal
                title="Add New Module"
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form}>
                    <Form.Item
                        label="Module Name"
                        name="ModuleName"
                        rules={[{ required: true, message: 'Please enter the Module name!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    );
};

export default AddModule;