import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LS from "../utils/Ls";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
    key: "mobile",
  },
  {
    title: "Employee code",
    dataIndex: "employee_code",
    key: "employee_code",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
];

const employeesList = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    axios.get(`employee?token=${LS.get("token")}`).then((res) => {
      setEmployees(res.data);
    });
  }, []);
  return <>
   <Table className="employeeTable" loading={!employees.length} dataSource={employees} columns={columns} />
  </>;
};

export default employeesList;
