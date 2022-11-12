import { Button, Form, Input, notification, Spin } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UiActions from "../../redux/slices/UiSlice";
import LS from "../../utils/Ls";
import axios from "axios";
import CustomDrawer from '../CustomDrawer'

const RaiseGrievance = ({raiseGrievance , setRaiseGrievance , getGrievances}) => {
  const dispatch = useDispatch();
    const submitGrievance = data => {
      dispatch(UiActions.actions.setLoading(true));
      axios.post(`grievances/?token=${LS.get("token")}` , data).then(() => {
        getGrievances()
        notification.success({
          message: "Grievance raised successfully",
        });
        dispatch(UiActions.actions.setLoading(false));
        setRaiseGrievance(false)
      })
    }
    const loading = useSelector((state) => state.ui.loading);
  return (
    <CustomDrawer
    onClose={() => setRaiseGrievance(false)}
    open={raiseGrievance}
    title="Raise hazard"
  >
    <Form layout="vertical" onFinish={submitGrievance}>
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
        <Input placeholder="Enter description" />
      </Form.Item>
      
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input status",
          },
        ]}
        name="status"
        label="Status"
      >
        <Input placeholder="Enter status" />
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
        <Input placeholder="Enter remarks" />
      </Form.Item>
      <div className="flex gap-lg">
        <Button key="back" onClick={() => setRaiseGrievance(false)}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" key="add">
          {loading ? <Spin /> : "Raise"}
        </Button>
      </div>
    </Form>
  </CustomDrawer>
  )
}

export default RaiseGrievance