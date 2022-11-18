import { Button, Table } from "antd";
import axios from "../hoc/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";
import LS from "../utils/Ls";

const Home = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState([]);
  const user = JSON.parse(LS.get("user"))
  const router = useRouter();
  const getTrainings = () => {
    setLoading(true)
    axios.get(`trainings/assigned-trainings`).then((res) => {
      let tempData = [];
      res.data.data.map((data) =>
        tempData.push({ ...data, status: data.status ? "Active" : "Inactive" })
      );
      setLoading(false)
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
      title: "Start date",
      dataIndex: "start_date",
      key: "start_date",
      render: (_, training) => training.start_date ? moment(training.start_date).format('DD-MM-YY') : 'N/a',

    },
    {
      title: "End date",
      dataIndex: "end_date",
      key: "end_date",
      render: (_, training) => training.end_date ? moment(training.end_date).format('DD-MM-YY') : 'N/a',

    },
    {
      title: "Duration",
      dataIndex: "duration_window",
      key: "duration_window",
      render: (_, training) => training.duration_window ? `${training.duration_window} mins` : 'N/a',

    },
    {
      title: "Status",
      dataIndex: "abc",
      key: "abc",
      render: (_, training) => {
        return moment().isAfter(training.start_date) ? (
          <p className="green">Active</p>
        ) : (
          <p className="red">Inactive</p>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, training) => (
        <Button
          onClick={() => router.push(`/training/${training.id}`)}
          type="primary"
          disabled={!moment().isAfter(training.start_date)}
        >
          {user.type === "admin" ? 'View' : 'start'}
        </Button>
      ),
    },
  ];
  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={trainings}
      rowKey="id"
      expandable={{
        expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
      }}
      pagination={false}
    />
  );
};

export default Home;
