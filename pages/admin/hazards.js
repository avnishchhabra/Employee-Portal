import { Button, Table, Modal, Form, Select, Input, notification } from 'antd'
import axios from '../../hoc/axios'
import React, { useEffect, useState } from 'react'
import RaiseHazard from '../../components/forms/RaiseHazard'
import HazardColumns from '../../utils/columns/HazardColumns'
import LS from '../../utils/Ls'

const Hazards = () => {
  const [hazards, setHazards] = useState()
  const [id, setId] = useState(null)
  const [raiseHazard, setRaiseHazard] = useState(false)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();
  useEffect(() => {
    getHazards()
  }, [])
  const getHazards = () => axios.get(`hazards/`).then(res => setHazards(res.data))

  const submit = (data) => {
    setLoading(true)
    axios.patch(`hazards/${id}`, data).then((res) => {
      console.log(res, 'res')
      setLoading(false)
      notification.success({
        message: "Hazard resolved successfully",
      });
      setVisible(false)
      getHazards()
      form.resetFields();
      getHazards()
    }).catch(error => {
      setLoading(false)

    })
  }


  return (
    <>
      {raiseHazard && <RaiseHazard getHazards={getHazards} raiseHazard={raiseHazard} setRaiseHazard={setRaiseHazard} />}
      <div className="flex justifyBetween mb-lg">
        <h2>Hazards</h2>
        <Button onClick={() => setRaiseHazard(true)} type="primary">
          Raise a hazard
        </Button>
      </div>
      <Table loading={!hazards} columns={[...HazardColumns, {
        title: "Take action",
        render: (text, row, value) => <Button type="link" disabled={row.status !== "pending" ? true : false} onClick={() => {
          setVisible(true)
          setId(row.id)

        }}>Take action</Button>
      }]} dataSource={hazards} pagination={false} />


      <Modal destroyOnClose title="Resolve Hazard" open={visible} onCancel={() => setVisible(false)} footer={[]} closable>
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

          <Form.Item label="Hazard feedback" required name="hazard_feedback"
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
            <Button type="primary" block loading={loading} htmlType="submit">Resolve Hazard</Button>
          </Form.Item>


        </Form>
      </Modal>
    </>
  )
}

export default Hazards