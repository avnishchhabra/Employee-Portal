import { Button, Space, Table } from "antd";
import axios from "../../hoc/axios";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import EditTraining from "../../components/forms/EditTraining";
import NewTraining from "../../components/forms/NewTraining";
import LS from "../../utils/Ls";

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dataSource = trainings?.map((training) => {
    const temp = { ...training, status: training.status ? "true" : "false" };
    return temp;
  });
  const router = useRouter()
  useEffect(() => {
    if (JSON.parse(LS.get("user")).type != "admin") router.push("/");
    else {
      setLoading(true)
      axios.get(`trainings?token=${LS.get("token")}`).then((res) => {
        setTrainings(res.data);
        setLoading(false)
      });
    }
  }, []);
  const getTrainings = () => {
    console.log("...");
  };

  const editTraining = (training) => {
    console.log("editting", training);
    setIsEditing(true);
    setEditing(training);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
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
      render: (status) => status ? 'Active' : 'Inactive'
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, training, value) => (
        <Button
          onClick={() => router.push(`/training/${training.id}`)}
          type="primary"
          disabled={!moment().isAfter(training.start_date)}
        >
          View
        </Button>
      ),
    },

  ];
  return (
    <>
      {isModalOpen && (
        <NewTraining
          isModalOpen={isModalOpen}
          handleCancel={() => setIsModalOpen(false)}
          getTrainings={getTrainings}
        />
      )}
      {isEditing && (
        <EditTraining
          isEditing={isEditing}
          editing={editing}
          handleCancel={() => setIsEditing(false)}
          setEditing={setEditing}
        />
      )}
      <div className="flex justifyBetween mb-lg">
        <h2>Trainings</h2>
        <Button onClick={() => setIsModalOpen(true)} type="primary">
          Add New Training
        </Button>
      </div>
      <Table
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey="id"
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
        }}
      />
    </>
  );
};

export default TrainingList;