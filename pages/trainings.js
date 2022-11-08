import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LS from "../utils/Ls";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Min pass marks",
    dataIndex: "min_pass_marks",
    key: "min_pass_marks",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);
  const dataSource = trainings?.map(training => {
    const temp = {...training , status: training.status ? "true" : "false"}
    return temp
  })
  useEffect(() => {
    if (JSON.parse(LS.get("user")).type != "admin") router.push("/");
    else {
      axios.get(`trainings?token=${LS.get("token")}`).then((res) => {
        setTrainings(res.data);
      });
    }
  }, []);
  return (
    <Table
      loading={!trainings.length}
      dataSource={dataSource}
      columns={columns}
    />
  );
};

export default TrainingList;
