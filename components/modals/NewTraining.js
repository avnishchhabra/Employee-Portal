import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  Select,
  Spin,
} from "antd";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LS from "../../utils/Ls";
import UiActions from "../../redux/slices/UiSlice";
import moment from "moment";

const NewTraining = ({ isModalOpen, handleCancel, getTrainings }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ui.loading);
  const addTraining = (data) => {
    dispatch(UiActions.actions.setLoading(true));
    const formData = { ...form.getFieldsValue() };
    const formDataAgain = {
      ...formData,
      start_date: moment(formData.start_date).format("DD-MM-YYYY"),
      end_date: moment(formData.end_date).format("DD-MM-YYYY"),
    };
    formData.resetFields()
    axios.post(`trainings?token=${LS.get("token")}`, formDataAgain).then(() => {
      dispatch(UiActions.actions.setLoading(false));
      handleCancel()
    });
  };
  return (
    <Drawer
      title="Add New Training"
      placement="right"
      open={isModalOpen}
      onClose={handleCancel}
    >
      <Form layout="vertical" form={form} onFinish={addTraining}>
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
          <Input type="number" placeholder="Enter duration in minutes" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter training status",
            },
          ]}
          label="Status"
          name="status"
        >
          <Select placeholder="Select">
            <Select.Option value={true}>Active</Select.Option>
            <Select.Option value={false}>Inactive</Select.Option>
          </Select>
        </Form.Item>
        <div className="flex gap-lg">
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            key="add"
          >
            {loading ? <Spin /> : "Add"}
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default NewTraining;
