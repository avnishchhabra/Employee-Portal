import { Button, Table } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LS from "../utils/Ls";

const Home = () => {
  const [trainings, setTrainings] = useState([]);
  const router = useRouter();
  const getTrainings = () => {
    axios.get(`trainings?token=${LS.get("token")}`).then((res) => {
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
  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Total marks",
      dataIndex: "total_marks",
      key: "total_marks",
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
      title: "Duration",
      dataIndex: "duration_window",
      key: "duration_window",
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
      render: (_, training) => (
        <Button
          onClick={() => router.push(`/training/${training.id}`)}
          type="primary"
        >
          Start
        </Button>
      ),
    },
  ];
  return (
    <Table
      loading={!trainings.length}
      columns={columns}
      dataSource={trainings}
    />
  );
};

export default Home;
