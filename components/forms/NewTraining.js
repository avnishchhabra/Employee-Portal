import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  Select,
  Spin,
} from "antd";
import axios from "../../hoc/axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LS from "../../utils/Ls";
import UiActions from "../../redux/slices/UiSlice";
import moment from "moment";
import CustomDrawer from "../CustomDrawer";
import { successNotification } from "../notification";

const NewTraining = ({ isModalOpen, handleCancel, getTrainings }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ui.loading);
  const addTraining = (data) => {
    dispatch(UiActions.actions.setLoading(true));
    const formData = { ...form.getFieldsValue() };
    const formDataAgain = {
      ...formData,
      min_pass_marks: 0,
      start_date: moment(formData.start_date).format("YYYY-MM-DD"),
      end_date: moment(formData.end_date).format("YYYY-MM-DD"),
    };
    axios.post(`trainings`, formDataAgain).then((response) => {

      if (response) {
        successNotification({
          message: 'Success!!',
          description: 'Training added successfully',
          placement: 'topRight',
        });
      }
      dispatch(UiActions.actions.setLoading(false));
      handleCancel()
    }).catch(error => {
      dispatch(UiActions.actions.setLoading(false));
    })
  };
  return (
    <CustomDrawer
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
          <Input.TextArea placeholder="Enter description" />
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
          <DatePicker style={{ width: '100%' }} />
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
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter duration window",
            },
          ]}
          name="duration_window"
          label="Duration window (in minutes)"
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
            loading={loading}
            htmlType="submit"
            type="primary"
            key="add"
          >
            {loading ? <Spin /> : "Add"}
          </Button>
        </div>
      </Form>
    </CustomDrawer>
  );
};

export default NewTraining;
