import { Button, Form, notification, Select, Spin } from "antd";
import axios from "../../hoc/axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LS from "../../utils/Ls";
import UiActions from "../../redux/slices/UiSlice";
import CustomDrawer from "../CustomDrawer";

const AssignTrainings = ({ setTrainee, trainee }) => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    axios.get(`trainings?token=${LS.get("token")}`).then((res) => {
      let tempOptions = [];
      res.data.map((training) =>
        tempOptions.push({ value: training.id, label: training.title })
      );
      setOptions(tempOptions);
    });
  }, []);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ui.loading);
  const assignTraining = (data) => {
    dispatch(UiActions.actions.setLoading(true));
    axios
      .post(`employee/assign_training?token=${LS.get("token")}`, {
        trainings: [...data.trainings],
        employee_id: trainee.id,
      })
      .then((res) => {
        notification.success({
          message: "Trainings assigned",
        });
        dispatch(UiActions.actions.setLoading(false));
        setTrainee(null);
      });
  };
  return (
    <CustomDrawer
      title="Assign Trainings"
      onClose={() => setTrainee(null)}
      open={trainee}
    >
      <p>Select trainings for employee: {trainee.name}</p>
      <Form onFinish={assignTraining} layout="vertical">
        <Form.Item name="trainings" label="Select trainings">
          <Select
            mode="multiple"
            size="middle"
            placeholder="Select trainings"
            style={{
              width: "100%",
            }}
            options={options}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {loading ? <Spin /> : "Assign"}
        </Button>
      </Form>
    </CustomDrawer>
  );
};

export default AssignTrainings;
