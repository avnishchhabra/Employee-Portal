import React, { useEffect, useState } from "react";
import CustomDrawer from "../CustomDrawer";
import { Button, DatePicker, Drawer, Form, Input, notification, Select, Spin } from "antd";
import LS from "../../utils/Ls";
import axios from "../../hoc/axios";
import UiActions from "../../redux/slices/UiSlice";
import { useDispatch, useSelector } from "react-redux";

const RaiseHazard = ({ title, setRaiseHazard, raiseHazard, getHazards }) => {
  const [departments, setDepartments] = useState([]);
  const dispatch = useDispatch();
  const submitHazard = (data) => {
    dispatch(UiActions.actions.setLoading(true));
    console.log('datadata', data)
    data['status'] = 'pending'
    axios.post(`hazards/?token=${LS.get("token")}`, data).then(() => {
      getHazards()
      notification.success({
        message: "Hazard raised successfully",
      });
      dispatch(UiActions.actions.setLoading(false));
      setRaiseHazard(false)
    })
  };
  useEffect(() => {
    axios
      .get(`/departments?token=${LS.get("token")}`)
      .then((res) => setDepartments(res.data));

  }, []);
  const loading = useSelector((state) => state.ui.loading);
  return (
    <CustomDrawer
      onClose={() => setRaiseHazard(false)}
      open={raiseHazard}
      title="Raise hazard"
    >
      <Form layout="vertical" onFinish={submitHazard}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input title",
            },
          ]}
          name="title"
          label='Title'
        >
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input description",
            },
          ]}
          name="description"
          label="Description"

        >
          <Input.TextArea placeholder="Enter description" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input type",
            },
          ]}
          name="type"
          label="Type"
        >
          <Input placeholder="Enter hazard type" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please department id ",
            },
          ]}
          name="department_id"
          label="Department id"
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
              message: "Please input remarks",
            },
          ]}
          name="remarks"
          label="Remarks"
        >
          <Input.TextArea placeholder="Enter remarks" />
        </Form.Item>
        <div className="flex gap-lg">
          <Button key="back" onClick={() => setRaiseHazard(false)}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" key="add">
            {loading ? <Spin /> : "Raise"}
          </Button>
        </div>
      </Form>
    </CustomDrawer>
  );
};

export default RaiseHazard;
