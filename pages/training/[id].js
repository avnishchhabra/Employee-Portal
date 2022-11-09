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
  console.log("training", training);
  return <div>TrainingQuiz</div>;
};

export default TrainingQuiz;
