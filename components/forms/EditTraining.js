import { Button, DatePicker, Drawer, Form, Input, Select, Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import CustomDrawer from "../CustomDrawer";

const EditTraining = ({ isEditing, editing, handleCancel, setEditing }) => {
  const [form] = Form.useForm();
  const loading = useSelector((state) => state.ui.loading);
  const editThisTraining = (data) => {
    setEditing(null);
  };
  return (
    <CustomDrawer
      title="Edit Training"
      open={isEditing}
      onClose={handleCancel}
    >
      <Form initialValues={editing} form={form} onFinish={editThisTraining}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter title",
            },
          ]}
          label="Title"
          name="title"
        >
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter description",
            },
          ]}
          label="Description"
          name="description"
        >
          <Input placeholder="Enter description" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter min pass marks",
            },
          ]}
          label="Min pass marks"
          name="min_pass_marks"
        >
          <Input placeholder="Enter minimum marks to pass" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter start date",
            },
          ]}
          name="start_date"
          label="Start date"
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter end date",
            },
          ]}
          name="end_date"
          label="End date"
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter duration window",
            },
          ]}
          name="duration_window"
          label="Duration window"
        >
          <Input placeholder="Enter duration in minutes" />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Select placeholder="Select">
            <Select.Option value={true}>Active</Select.Option>
            <Select.Option value={false}>Inactive</Select.Option>
          </Select>
        </Form.Item>
        <div className="flex gap-lg">
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>
        <Button htmlType="submit" key="add" type="primary">
          {loading ? <Spin /> : "Edit"}
        </Button>
        </div>
      </Form>
    </CustomDrawer>
  );
};

export default EditTraining;
