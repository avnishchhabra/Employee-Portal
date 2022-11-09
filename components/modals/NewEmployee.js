import { Button, Form, Input, Modal, Select, Spin } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LS from "../../utils/Ls";
import UiActions from "../../redux/slices/UiSlice";

const NewEmployee = ({ isModalOpen, handleCancel , getEmployees }) => {
  const router = useRouter();
  const [departments, setDepartments] = useState([]);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    if (JSON.parse(LS.get("user")).type != "admin") router.push("/");
    else {
      axios
        .get(`/departments?token=${LS.get("token")}`)
        .then((res) => setDepartments(res.data));
    }
  }, []);
  const addEmployee = (data) => {
    dispatch(UiActions.actions.setLoading(true));
    const formData = { ...form.getFieldsValue(), employee_code: "123" };
    axios.post(`/employee/?token=${LS.get("token")}`, formData).then(() => {
      form.resetFields();
      dispatch(UiActions.actions.setLoading(false));
      getEmployees();
      handleCancel();
    });
  };
  const loading = useSelector((state) => state.ui.loading);
  return (
    <Modal
      title="Add New Employee"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="add" onClick={addEmployee}>
          {loading ? <Spin /> : "Add"}
        </Button>,
      ]}
    >
      <Form form={form} onFinish={addEmployee}>
        <Form.Item name="name">
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item name="mobile">
          <Input placeholder="Enter mobile" />
        </Form.Item>
        <Form.Item name="email">
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item name="password">
          <Input placeholder="Enter password" />
        </Form.Item>
        <Form.Item name="type">
          <Select placeholder="Type">
            <Select.Option value="employee">Employee</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="department_id">
          <Select placeholder="Department">
            {departments?.map((dep) => (
              <Select.Option value={dep.id}>{dep.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewEmployee;
