import { Button, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NewEmployee from "../components/modals/NewEmployee";
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

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (JSON.parse(LS.get("user")).type != "admin") router.push("/");
    else {
      axios.get(`employee?token=${LS.get("token")}`).then((res) => {
        setEmployees(res.data);
      });
    }
  }, []);
  return <>
  {isModalOpen && (
        <NewEmployee
          isModalOpen={isModalOpen}
          handleCancel={() => setIsModalOpen(false)}
        />
      )}
   <div className="flex justifyBetween mb-lg">
    <h2>Employees</h2>
    <Button onClick={() => setIsModalOpen(true)} type="primary">
      Add New Employee
    </Button>
   </div>
   <Table className="employeeTable" loading={!employees.length} dataSource={employees} columns={columns} />
  </>;
};

export default Employees;
