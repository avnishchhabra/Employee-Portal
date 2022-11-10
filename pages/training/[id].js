import { Form, Radio, Spin, Steps } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LS from "../../utils/Ls";

const TrainingQuiz = () => {
  const [training, setTraining] = useState();
  const router = useRouter();
  const { id } = router.query;
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
    console.log("value", value);
    setCurrent(value);
  };
  let stepItems = []
  useEffect(() => {
    if(training) {
      console.log('inside if.........')
      training.questions.map((ques , i) => stepItems.push({
        title: 'Question' + ' ' + (i+1)
      }))
      console.log('stepItems',stepItems)
    }
  } , training)
  
  return (
    <div>
      {training ? (
        <div className="flex">
          <Steps
          current={current}
          onChange={onChange}
          direction="vertical"
          items={stepItems}
        />
        <div className="flexGrow">
          <Form>
          <h2>{training.questions.filter(ques => ques.id == training.questions[current].id)[0].question}</h2>
            <div className="flex">
            {
          training.questions.filter(ques => ques.id == training.questions[current].id)[0].options.map(opt => <Form.Item key={opt.id} name='options'>
                <Radio.Group>
                  <Radio>{opt.option}</Radio>
                </Radio.Group>
              </Form.Item>)
            }
            </div>
            {/* {training.questions.map(ques => <>
            <h2>{ques.question}</h2>
            <div className="flex">
            {
              ques.options.map(opt => <Form.Item name='options'>
                <Radio.Group>
                  <Radio>{opt.option}</Radio>
                </Radio.Group>
              </Form.Item>)
            }
            </div>
            </>)} */}
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
