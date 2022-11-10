import { Button, DatePicker, Form, Input, Modal, Select, Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const EditTraining = ({ isEditing, editing, handleCancel , setEditing }) => {
  const [form] = Form.useForm();
  const loading = useSelector((state) => state.ui.loading);
  const editThisTraining = (data) => {
    setEditing(null)
  };
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
        <Form.Item label='Title' name="title">
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item label='Description' name="description">
          <Input placeholder="Enter description" />
        </Form.Item>
        <Form.Item label='Min pass marks' name="min_pass_marks">
          <Input placeholder="Enter minimum marks to pass" />
        </Form.Item>
        <Form.Item name='start_date' label="Start date">
          <DatePicker />
        </Form.Item>
        <Form.Item name='end_date' label="End date">
          <DatePicker />
        </Form.Item>
        <Form.Item name='duration_window' label="Duration window">
        <Input placeholder="Enter duration in minutes" />
        </Form.Item>
        <Form.Item label='Status' name="status">
          <Select placeholder="Select">
            <Select.Option value={true}>Active</Select.Option>
            <Select.Option value={false}>Inactive</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTraining;
