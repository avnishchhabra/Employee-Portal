import { Button, Drawer, Form, Input, Modal, Select, Spin } from "antd";
import axios from "../../hoc/axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LS from "../../utils/Ls";
import CustomDrawer from "../CustomDrawer";

const EditEmployee = ({ isEditing, handleCancel, employeeToEdit }) => {
  const [form] = Form.useForm();
  const loading = useSelector((state) => state.ui.loading);
  const router = useRouter();
  const [departments, setDepartments] = useState([]);
  const editEmployee = (data) => {
    const formData = form.getFieldsValue()
    axios.patch(`employee/${employeeToEdit.id}/?token=${LS.get("token")}`, formData)
  };
  useEffect(() => {
    if (JSON.parse(LS.get("user")).type != "admin") router.push("/");
    else {
      axios
        .get(`/departments?token=${LS.get("token")}`)
        .then((res) => setDepartments(res.data));
    }
  }, []);
  return (
    <CustomDrawer
      title="Edit Employee"
      open={isEditing}
      onClose={handleCancel}
    >
      <Form layout="vertical" initialValues={employeeToEdit} form={form} onFinish={editEmployee}>
        <Form.Item rules={[
          {
            required: true,
            message: "Please enter name",
          },
        ]} label='Name' name="name">
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item rules={[
          {
            required: true,
            message: "Please enter mobile",
          },
        ]} label='Mobile' name="mobile">
          <Input placeholder="Enter mobile" />
        </Form.Item>
        <Form.Item rules={[
          {
            required: true,
            message: "Please enter email",
          },
        ]} label='Email' name="email">
          <Input placeholder="Enter email" />
        </Form.Item>
        {/* <Form.Item rules={[
            {
              required: true,
              message: "Please enter password",
            },
          ]} name="password">
        <Input placeholder="Enter password" />
      </Form.Item> */}
        <Form.Item rules={[
          {
            required: true,
            message: "Please enter employee type",
          },
        ]} label='Employee Type' name="type">
          <Select placeholder="Type">
            <Select.Option value="employee">Employee</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item rules={[
          {
            required: true,
            message: "Please enter department",
          },
        ]} label='Department ID' name="department_id">
          <Select placeholder="Department">
            {departments?.map((dep) => (
              <Select.Option key={dep.id} value={dep.id}>
                {dep.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item rules={[
          {
            required: true,
            message: "Please enter is hod?",
          },
        ]} label='Is HOD?' name="is_hod">
          <Select placeholder="is HOD ?">
            <Select.Option value={true}>Yes</Select.Option>
            <Select.Option value={false}>No</Select.Option>
          </Select>
        </Form.Item>
        <div className="flex gap-lg">
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>
          <Button key="add" htmlType="submit" type="primary">
            {loading ? <Spin /> : "Edit"}
          </Button>
        </div>
      </Form>
    </CustomDrawer>
  );
};

export default EditEmployee;
