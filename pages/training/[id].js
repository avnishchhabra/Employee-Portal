import { Button, Form, notification, Radio, Spin, Steps } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LS from "../../utils/Ls";
import UiActions from "../../redux/slices/UiSlice";

const TrainingQuiz = () => {
  const [training, setTraining] = useState();
  // const [stepItems, setStepItems] = useState([]);
  const [assesments, setAssesments] = useState([]);
  const router = useRouter();
  const [form] = Form.useForm();
  const { id } = router.query;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ui.loading);
  useEffect(() => {
    if (id) {
      axios.get(`questions/${id}/?token=${LS.get("token")}`).then((res) => {
        setTraining(res.data);
      });
    }
  }, [id]);
  const [current, setCurrent] = useState(0);
  // console.log("training", training);
  const onChange = (value) => {
    setCurrent(value);
  };
  // useEffect(() => {
  //   if (training) {
  //     let tempItems = [];
  //     training.questions.map((ques, i) =>
  //       tempItems.push({
  //         title: "Question" + " " + (i + 1),
  //       })
  //     );
  //     setStepItems(tempItems);
  //   }
  // }, training);

  const submitTraining = (data) => {
    dispatch(UiActions.actions.setLoading(true));
    const ids = assesments.map(o => o.question_id)
    const uiqueAssesments = assesments.filter(({question_id}, index) => !ids.includes(question_id, index + 1))
    console.log('uiqueAssesments',filtered)
    const finalData = {
      training_id: parseInt(id),
      assessment: [
        ...uiqueAssesments,
        {
          question_id: training.questions.filter(
            (ques) => ques.id == training.questions[current].id
          )[0].id,
          option_id: data.option,
        },
      ],
    };

    axios
      .post(`trainings/assessment?token=${LS.get("token")}`, finalData)
      .then((res) => {
        console.log("ressss", res);
        dispatch(UiActions.actions.setLoading(false));
        form.resetFields();
        notification.success({
          message: "Assessment submited!",
        });
        router.push("/");
      });
  };
  const handleOptionChange = (o) => {
    console.log("oooo", o);
  };
  console.log('training', training)
  console.log("assesments", assesments);
  console.log("current", current);
  return (
    <div>
      {training ? (
        <>
          <h1 className="lg center">
            Assessment for training: {training?.training}
          </h1>
          <div
            className="flex alignCenter"
            style={{ gap: "100px", marginTop: "40px" }}
          >
            {/* <div status={{ flex: 0.4 }}>
              <Steps
                current={current}
                onChange={onChange}
                direction="vertical"
                items={stepItems}
              />
            </div> */}
            <Button
              style={{ width: "80px", flex: "0.2" }}
              disabled={current == 0}
              onClick={() => setCurrent(current - 1)}
              type="primary"
            >
              Previous
            </Button>
            <div className="" style={{ flex: "0.6" }}>
              <Form onFinish={submitTraining} form={form}>
                <div className="bg-white p-lg flex alignCenter justifyCenter fColumn">
                  <h2>
                    {
                      training?.questions?.filter(
                        (ques) => ques.id == training.questions[current]?.id
                      )[0]?.question
                    }
                  </h2>
                  <div className="flex">
                    {training?.questions
                      .filter(
                        (ques) => ques.id == training.questions[current]?.id
                      )[0]
                      ?.options.map((opt) => (
                        <Form.Item
                         required
                          key={opt.id}
                          name="option"
                        >
                          <Radio.Group
                            required
                            onChange={(o) => {
                              const currentFormValues = form.getFieldsValue();
                              if (current !== training.questions.length - 1) {
                                setCurrent(current + 1);
                              }
                              setAssesments([
                                ...assesments,
                                {
                                  question_id: training.questions.filter(
                                    (ques) =>
                                      ques.id == training.questions[current].id
                                  )[0].id,
                                  option_id: currentFormValues.option,
                                },
                              ]);
                            }}
                          >
                            <Radio value={opt.id}>{opt.option}</Radio>
                          </Radio.Group>
                        </Form.Item>
                      ))}
                  </div>
                </div>
                <Button
                  style={{}}
                  className="mt-lg p-md"
                  type="primary"
                  disabled={loading || assesments.length < training.questions.length}
                  htmlType="submit"
                >
                  {loading ? <Spin /> : "Submit Training"}
                </Button>
              </Form>
            </div>
            <Button
              style={{ width: "80px", flex: "0.2" }}
              disabled={current == training.questions.length - 1}
              onClick={() => {
                const currentFormValues = form.getFieldsValue();
                if (current !== training.questions.length - 1) {
                  setCurrent(current + 1);
                }
                if(currentFormValues.option) {
                  setAssesments([
                    ...assesments,
                    {
                      question_id: training.questions.filter(
                        (ques) => ques.id == training.questions[current].id
                      )[0].id,
                      option_id: currentFormValues.option,
                    },
                  ]);
                }
              }}
              type="primary"
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default TrainingQuiz;
