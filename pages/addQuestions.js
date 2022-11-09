import { Button, Form, Input, notification, Radio, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LS from "../utils/Ls";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const AddQuestions = () => {
  const [trainings, setTrainings] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    if (JSON.parse(LS.get("user")).type != "admin") router.push("/");
    else {
      axios.get(`trainings?token=${LS.get("token")}`).then((res) => {
        setTrainings(res.data);
      });
    }
  }, []);
  const addQuestions = (data) => {
    console.log("data", form);
    axios.post(`questions/?token=${LS.get("token")}`, data).then(res => {
      notification.success({
        message: "Employee created successfully"
      })
      form.resetFields()
    })
  };
  return (
    <Form form={form} onFinish={addQuestions}>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please select training",
          },
        ]}
        name="training_id"
      >
        <Select placeholder="For training">
          {trainings?.map((training, i) => (
            <Select.Option key={i} value={training.id}>
              {training.title}
            </Select.Option>
          ))}
          {/* <Select.Option value={1}>Tech</Select.Option> */}
        </Select>
      </Form.Item>
      <h2>Questions:</h2>
      <Form.List
        rules={[
          {
            required: true,
            message: "Please add questions",
          },
        ]}
        name="questions"
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            <Form.Item
              className="flex justifyEnd"
              style={{ marginTop: "-50px" }}
            >
              <Button
                type="dashed"
                onClick={() => add()}
                style={{
                  width: "60%",
                  height: "50px",
                  width: "50px",
                }}
                className="flex justifyCenter alignCenter"
                icon={<PlusOutlined />}
              />
              <Form.ErrorList errors={errors} />
            </Form.Item>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key}>
                <div className="flex justifyBetween gap-md">
                  <h3>Question: </h3>
                  <Form.Item
                    className="flexGrow"
                    {...restField}
                    name={[name, "question"]}
                    rules={[
                      {
                        required: true,
                        message: "Please type question",
                      },
                    ]}
                  >
                    <Input placeholder="Enter question" />
                  </Form.Item>
                </div>
                <div className="ml-xl flex gap-md">
                  <h3>Score:</h3>
                  <Form.Item {...restField} name={[name, "score"]}>
                    <Input placeholder="Score" />
                  </Form.Item>
                </div>
                <div className="ml-xl flex gap-md">
                  <h3>Status:</h3>
                  <Form.Item {...restField} name={[name, "status"]}>
                    <Radio.Group>
                      <Radio value={true}>True</Radio>
                      <Radio value={false}>False</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div className="ml-xl">
                  <Form.List
                    rules={[
                      {
                        validator: async (_, names) => {
                          if (!names || names.length < 2) {
                            return Promise.reject(
                              new Error("At least 2 options")
                            );
                          }
                        },
                      },
                    ]}
                    {...restField}
                    name={[name, "options"]}
                  >
                    {(fields, { add, remove }) => {
                      return (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <div key={key} className="flex gap-md">
                              <h4>Option: </h4>
                              <Form.Item
                                {...restField}
                                name={[name, "question_option"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please type option",
                                  },
                                ]}
                              >
                                <Input placeholder="option" />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, "is_correct"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select correct option",
                                  },
                                ]}
                              >
                                <Radio.Group>
                                  <Radio value={true}>True</Radio>
                                  <Radio value={false}>False</Radio>
                                </Radio.Group>
                              </Form.Item>
                            </div>
                          ))}
                          {fields.length < 4 && (
                            <Form.Item>
                              <Button
                                onClick={() => add()}
                                icon={<PlusOutlined />}
                              >
                                Add option
                              </Button>
                            </Form.Item>
                          )}
                        </>
                      );
                    }}
                  </Form.List>
                </div>
              </div>
            ))}
          </>
        )}
      </Form.List>
      <div className="flex justifyCenter mt-xl">
        <Button type="primary" htmlType="submit">
          ADD QUESTIONS
        </Button>
      </div>
    </Form>
  );
};

export default AddQuestions;
