import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Spin,
} from "antd";
import axios from "../../hoc/axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LS from "../../utils/Ls";
import UiActions from "../../redux/slices/UiSlice";
import CustomDrawer from "../CustomDrawer";
import { successNotification } from "../notification";

const NewEmployee = ({ isModalOpen, handleCancel, getEmployees }) => {
  const router = useRouter();
  const [departments, setDepartments] = useState([]);
  const [form] = Form.useForm();
  const [automaticCode, setAutomaticCode] = useState(false);
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
    const formData = { ...form.getFieldsValue() };
    axios.post(`/employee/`, formData).then(() => {
      form.resetFields();
      successNotification({
        message: 'Success!!',
        description: 'Employee added successfully',
        placement: 'topRight',
      });
      dispatch(UiActions.actions.setLoading(false));
      getEmployees();
      handleCancel();
    });
  };
  const loading = useSelector((state) => state.ui.loading);
  return (
    <CustomDrawer
      title="Add New Employee"
      open={isModalOpen}
      onClose={handleCancel}
    >
      <Form layout="vertical" form={form} onFinish={addEmployee}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter name",
            },
          ]}
          label="Name"
          name="name"
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter mobile",
            },
          ]}
          label="Mobile"
          name="mobile"
        >
          <Input placeholder="Enter mobile" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter email",
            },
          ]}
          label="Email"
          name="email"
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter password",
            },
          ]}
          label="Password"
          name="password"
        >
          <Input placeholder="Enter password" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter employee type",
            },
          ]}
          label="Employee Type"
          name="type"
        >
          <Select placeholder="Type">
            <Select.Option value="employee">Employee</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter employee code",
            },
          ]}
          name="employee_code"
          label="Employee Code"
        >
          <Input disabled={automaticCode} placeholder="Enter employee code" />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter department",
            },
          ]}
          label="Department ID"
          name="department_id"
          className="mt-lg"
        >
          <Select placeholder="Department">
            {departments?.map((dep) => (
              <Select.Option key={dep.id} value={dep.id}>
                {dep.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter is hod?",
            },
          ]}
          label="Is HOD?"
          name="is_hod"
        >
          <Select placeholder="Select">
            <Select.Option value="true">Yes</Select.Option>
            <Select.Option value="false">No</Select.Option>
          </Select>
        </Form.Item>
        <div className="flex gap-lg">
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="primary" block htmlType="submit" key="add" loading={loading}>
            {loading ? <Spin /> : "Add"}
          </Button>
        </div>
      </Form>
    </CustomDrawer>
  );
};

export default NewEmployee;
