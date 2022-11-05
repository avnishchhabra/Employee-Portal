import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LS from "../utils/Ls";

const newEmployee = () => {
  const router = useRouter();
  const [departments, setDepartments] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    if (JSON.parse(LS.get("user")).type != "admin") router.push("/");
    else {
      axios
        .get(`/departments?token=${LS.get("token")}`)
        .then((res) => setDepartments(res.data));
    }
  }, []);
  const addEmployee = (data) => {
    axios.post('/employee' , {...data , employee_code: '123'}).then(() => {
      form.resetFields()
    })
  }
  return (
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
       {/* {departments?.map(dep => <Select.Option value={dep.id}>{dep.name}</Select.Option>)} */}
       <Select.Option value={1}>sds</Select.Option>
       </Select>
      </Form.Item>
      <Button htmlType="submit">Add</Button>
    </Form>
  );
};

export default newEmployee;
