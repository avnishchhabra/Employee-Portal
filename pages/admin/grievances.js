import { Button, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RaiseGrievance from "../../components/forms/RaiseGrievance";
import GrievanceColumns from "../../utils/columns/GrievanceColumns";
import headers from '../../utils/header';

const Grievance = () => {
  const [grievances, setGrievances] = useState();
  const [raiseGrievance, setRaiseGrievance] = useState(false);
  useEffect(() => {
    getGrievances();
  }, []);
  const getGrievances = () =>
    axios
      .get(`grievances/`, headers)
      .then((res) => setGrievances(res.data));
  return (
    <>
      {raiseGrievance && (
        <RaiseGrievance
          getGrievances={getGrievances}
          raiseGrievance={raiseGrievance}
          setRaiseGrievance={setRaiseGrievance}
        />
      )}
      <div className="flex justifyBetween mb-lg">
        <h2>Grievances</h2>
        <Button onClick={() => setRaiseGrievance(true)} type="primary">
          Raise a grievance
        </Button>
      </div>
      <Table
        loading={!grievances}
        columns={[
          ...GrievanceColumns,
          {
            title: "Take action",
            render: () => <p className="link pointer">Take action</p>,
          },
        ]}
        dataSource={grievances}
      />
    </>
  );
};

export default Grievance;
