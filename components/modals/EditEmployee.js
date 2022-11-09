import { Button, Form, Input, Modal, Select, Spin } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LS from "../../utils/Ls";

const EditEmployee = ({ isEditing, handleCancel, employeeToEdit }) => {
  const [form] = Form.useForm();
  const loading = useSelector((state) => state.ui.loading);
  const router = useRouter();
  const [departments, setDepartments] = useState([]);
  const editEmployee = (data) => {
    const formData = form.getFieldsValue()
    axios.patch(`employee/${employeeToEdit.id}/?token=${LS.get("token")}` , formData)
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
    <Modal
      title="Edit Employee"
      open={isEditing}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="add" onClick={editEmployee}>
          {loading ? <Spin /> : "Edit"}
        </Button>,
      ]}
    >
      <Form initialValues={employeeToEdit} form={form} onFinish={editEmployee}>
        <Form.Item name="name">
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item name="mobile">
          <Input placeholder="Enter mobile" />
        </Form.Item>
        <Form.Item name="email">
          <Input placeholder="Enter email" />
        </Form.Item>
        {/* <Form.Item name="password">
        <Input placeholder="Enter password" />
      </Form.Item> */}
        <Form.Item name="type">
          <Select placeholder="Type">
            <Select.Option value="employee">Employee</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="department_id">
          <Select placeholder="Department">
            {departments?.map((dep) => (
              <Select.Option key={dep.id} value={dep.id}>
                {dep.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="is_hod">
          <Select placeholder="is HOD ?">
            <Select.Option value="true">Yes</Select.Option>
            <Select.Option value="false">No</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditEmployee;
