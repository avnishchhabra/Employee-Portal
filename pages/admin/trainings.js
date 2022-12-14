import { Button, Space, Table } from "antd";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import EditTraining from "../../components/forms/EditTraining";
import NewTraining from "../../components/forms/NewTraining";
import headers from '../../utils/header';

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);
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
      axios.get(`trainings`, headers).then((res) => {
        setTrainings(res.data);
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
      // dataIndex: "status",
      // key: "status",
      render: (_, training) => {
        return moment().isAfter(training.start_date) ? (
           <p className="green">Active</p>
         ) : (
           <p className="red">Inactive</p>
         );
       },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <p
            className="link pointer"
            onClick={() => {
              setEditing(null);
              editTraining(record);
            }}
          >
            Edit
          </p>
          <p className="link pointer">Delete</p>
        </Space>
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
        loading={!trainings.length}
        dataSource={dataSource}
        columns={columns}
      />
    </>
  );
};

export default TrainingList;
