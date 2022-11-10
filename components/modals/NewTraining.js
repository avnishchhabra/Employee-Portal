import { Button, DatePicker, Form, Input, Modal, Select, Spin } from "antd";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LS from "../../utils/Ls";
import UiActions from "../../redux/slices/UiSlice";
import moment from 'moment'

const NewTraining = ({ isModalOpen, handleCancel, getTrainings }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ui.loading);
  const addTraining = (data) => {
    dispatch(UiActions.actions.setLoading(true));
    console.log("dataaa", data);
    console.log('LS.get("token")', LS.get("token"));
    const formData = { ...form.getFieldsValue() };
    const formDataAgain = {...formData , start_date: moment(formData.start_date).format('DD-MM-YYYY') , end_date: moment(formData.end_date).format('DD-MM-YYYY')}
    console.log('formData',formData)
    axios.post(`trainings?token=${LS.get("token")}`, formDataAgain).then(() => {
      dispatch(UiActions.actions.setLoading(false));
    });
  };
  return (
    <Modal
      title="Add New Training"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="add" onClick={addTraining}>
          {loading ? <Spin /> : "Add"}
        </Button>,
      ]}
    >
      <Form form={form} onFinish={addTraining}>
        <Form.Item label="Title" name="title">
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input placeholder="Enter description" />
        </Form.Item>
        <Form.Item label="Min pass marks" name="min_pass_marks">
          <Input placeholder="Enter minimum marks to pass" />
        </Form.Item>
        <Form.Item name="start_date" label="Start date">
          <DatePicker />
        </Form.Item>
        <Form.Item name="end_date" label="End date">
          <DatePicker />
        </Form.Item>
        <Form.Item name="duration_window" label="Duration window">
          <Input type="number" placeholder="Enter duration in minutes" />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Select placeholder="Select">
            <Select.Option value={true}>Active</Select.Option>
            <Select.Option value={false}>Inactive</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewTraining;
