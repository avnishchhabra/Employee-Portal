import { Button, Form, notification, Radio, Spin, Steps } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LS from "../../utils/Ls";
import UiActions from "../../redux/slices/UiSlice";

const TrainingQuiz = () => {
  const [training, setTraining] = useState();
  const [stepItems, setStepItems] = useState([]);
  const [assesments, setAssesments] = useState([]);
  const router = useRouter();
  const [form] = Form.useForm();
  const { id } = router.query;
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.ui.loading);
  useEffect(() => {
    if (id) {
      axios.get(`questions/${id}/?token=${LS.get("token")}`).then((res) => {
        setTraining(res.data);
      });
    }
  }, [id]);
  const [current, setCurrent] = useState(0);
  console.log("training", training);
  const onChange = (value) => {
    setCurrent(value);
  };
  useEffect(() => {
    if (training) {
      let tempItems = [];
      training.questions.map((ques, i) =>
        tempItems.push({
          title: "Question" + " " + (i + 1),
        })
      );
      setStepItems(tempItems);
    }
  }, training);

  const submitTraining = (data) => {
    dispatch(UiActions.actions.setLoading(true))
    const finalData = {
      training_id: parseInt(id),
      assessment: [
        ...assesments,
        {
          question_id: training.questions.filter(
            (ques) => ques.id == training.questions[current].id
          )[0].id,
          option_id: data.option,
        },
      ],
    };

    axios.post(`trainings/assessment?token=${LS.get("token")}` , finalData).then(res => {
      console.log('ressss',res)
      dispatch(UiActions.actions.setLoading(false))
      form.resetFields();
      notification.success({
        message: "Assessment submited!"
      })
      router.push('/')
    })

  };
  return (
    <div>
      {training ? (
        <div className="flex" style={{ gap: "100px" }}>
          <div status={{ flex: 0.4 }}>
            <Steps
              current={current}
              onChange={onChange}
              direction="vertical"
              items={stepItems}
            />
          </div>
          <div className="flexGrow">
            <Form onFinish={submitTraining} form={form}>
              <h2>
                {
                  training.questions.filter(
                    (ques) => ques.id == training.questions[current].id
                  )[0].question
                }
              </h2>
              <div className="flex">
                {training.questions
                  .filter(
                    (ques) => ques.id == training.questions[current].id
                  )[0]
                  .options.map((opt) => (
                    <Form.Item key={opt.id} name="option">
                      <Radio.Group>
                        <Radio value={opt.id}>{opt.option}</Radio>
                      </Radio.Group>
                    </Form.Item>
                  ))}
              </div>
              <div className="flex gap-md">
                <Button
                  style={{ width: "80px" }}
                  disabled={current == 0}
                  onClick={() => setCurrent(current - 1)}
                  type="primary"
                >
                  Previous
                </Button>
                <Button
                  style={{ width: "80px" }}
                  disabled={current == training.questions.length - 1}
                  onClick={() => {
                    console.log("form.getFieldsValue()", form.getFieldsValue());
                    const currentFormValues = form.getFieldsValue();
                    setCurrent(current + 1);
                    setAssesments([
                      ...assesments,
                      {
                        question_id: training.questions.filter(
                          (ques) => ques.id == training.questions[current].id
                        )[0].id,
                        option_id: currentFormValues.option,
                      },
                    ]);
                  }}
                  type="primary"
                >
                  Next
                </Button>
              </div>
              <Button disabled={loading} htmlType="submit">{loading ? <Spin /> : 'Submit Training'}</Button>
            </Form>
          </div>
        </div>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default TrainingQuiz;
