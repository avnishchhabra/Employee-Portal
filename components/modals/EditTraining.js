import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const EditTraining = ({ isEditing, editing, handleCancel , setEditing }) => {
  const [form] = Form.useForm();
  const loading = useSelector((state) => state.ui.loading);
  const editThisTraining = (data) => {
    console.log("data", data);
    setEditing(null)
  };
console.log('editing',editing)
  return (
    <Modal
      title="Edit Training"
      open={isEditing}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="add" onClick={editThisTraining}>
          {loading ? <Spin /> : "Edit"}
        </Button>,
      ]}
    >
      <Form
        initialValues={editing}
        form={form}
        onFinish={editThisTraining}
      >
        <Form.Item name="title">
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item name="description">
          <Input placeholder="Enter description" />
        </Form.Item>
        <Form.Item name="min_pass_marks">
          <Input placeholder="Enter minimum marks to pass" />
        </Form.Item>
        <Form.Item name="status">
          <Select placeholder="Status">
            <Select.Option value="true">Active</Select.Option>
            <Select.Option value="false">Inactive</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTraining;
