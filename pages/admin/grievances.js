import { Button, Table, Modal, Input, Form, Select, notification } from "antd";
import axios from "../../hoc/axios";
import React, { useEffect, useState } from "react";
import RaiseGrievance from "../../components/forms/RaiseGrievance";
import GrievanceColumns from "../../utils/columns/GrievanceColumns";
import LS from "../../utils/Ls";

const Grievance = () => {
  const [grievances, setGrievances] = useState();
  const [raiseGrievance, setRaiseGrievance] = useState(false);
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState(null)
  const [form] = Form.useForm();
  useEffect(() => {
    getGrievances();
  }, []);
  const getGrievances = () =>
    axios
      .get(`grievances/`)
      .then((res) => setGrievances(res.data));

  const submit = (data) => {
    setLoading(true)
    axios.patch(`grievances/${id}`, data).then((res) => {
      if (response) {
        setLoading(false)
        notification.success({
          message: "Grievance resolved successfully",
        });
      }
      form.resetFields();
      getGrievances()
    }).catch(error => {
      setLoading(false)
      notification.error({
        message: "Something went wrong",
      });
    })
  }
  return (
    <>
      {raiseGrievance && (
        <RaiseGrievance
          getGrievances={getGrievances}
          raiseGrievance={raiseGrievance}
          setRaiseGrievance={setRaiseGrievance}
        />
      )}
      <div className="flex justifyBetween mb-lg">
        <h2>Grievances</h2>
        <Button onClick={() => setRaiseGrievance(true)} type="primary">
          Raise a grievance
        </Button>
      </div>
      <Table
        loading={!grievances}
        columns={[
          ...GrievanceColumns,
          {
            title: "Take action",
            render: (text, row, value) => <p onClick={() => {
              setVisible(true)
              setId(row.id)

            }} className="link pointer">Take action</p>,
          },
        ]}
        dataSource={grievances}
      />


      <Modal destroyOnClose title="Resolve Grievance" open={visible} onCancel={() => setVisible(false)} footer={[]} closable>
        <Form form={form} onFinish={submit} layout="vertical">
          <Form.Item label="Select status" required name="status"
            rules={[
              {
                required: true,
                message: "Please select status",
              },
            ]}
          >
            <Select >
              <Select.Option value="closed">Close Hazard</Select.Option>
              <Select.Option value="rejected">Reject Hazard</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Hazard feedback" required name="grievance_feedback"
            rules={[
              {
                required: true,
                message: "Please put feedback",
              },
            ]}

          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" block loading={loading} htmlType="submit">Resolve</Button>
          </Form.Item>


        </Form>
      </Modal>
    </>
  );
};

export default Grievance;
