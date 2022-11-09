import { Button, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import LS from "../utils/Ls";

const columns = [
  {
    title: "Name",
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
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: () => (
          <Button type="primary">
            Start
          </Button>
    ),
  },
];

const Home = () => {
  const [trainings, setTrainings] = useState([]);
  const getTrainings = () => {
    axios.get(`trainings?token=${LS.get("token")}`).then((res) => {
      console.log("res trr", res.data);
      let tempData = [];
      res.data.map((data) =>
        tempData.push({ ...data, status: data.status ? "Active" : "Inactive" })
      );
      setTrainings(tempData);
    });
  };
  useEffect(() => {
    getTrainings();
  }, []);
  return (
    <div>
      <Table loading={!trainings.length} columns={columns} dataSource={trainings} />
    </div>
  );
};

export default Home;
