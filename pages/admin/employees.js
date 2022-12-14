import { Button, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AssignTrainings from "../../components/forms/AssignTrainings";
import EditEmployee from "../../components/forms/EditEmployee";
import NewEmployee from "../../components/forms/NewEmployee";
import headers from '../../utils/header';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing , setIsEditing] = useState(false)
  const [employeeToEdit , setEmployeeToEdit] = useState(null)
  const [trainee , setTrainee] = useState(false)

  useEffect(() => {
    if (JSON.parse(LS.get("user")).type != "admin") router.push("/");
    else {
      getEmployees()
    }
  }, []);

  const getEmployees = () => {
    axios.get(`employee`, headers).then((res) => {
      setEmployees(res.data);
    });
  }

  const deleteEmployee = (employee) => {
    axios.delete(`employee/${employee.id}/`, headers).then(() => {
      setEmployees([])
      getEmployees()
    })
  }
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
    {
      title: 'Action',
      key: 'action',
      render: (_,employee) => (
        <Space size="middle">
          <p onClick={() => {
            setIsEditing(true)
            setEmployeeToEdit(employee)
          }} className="link pointer">Edit</p>
          <p onClick={() => deleteEmployee(employee)} className="link pointer">Delete</p>
          <p onClick={() => {
            setTrainee(employee)
          }} className="link pointer">Assign Trainings</p>
        </Space>
      ),
    },
  ];
  return (
    <>
     {trainee && <AssignTrainings setTrainee={setTrainee} trainee={trainee} />}
      {isModalOpen && (
        <NewEmployee
          isModalOpen={isModalOpen}
          handleCancel={() => setIsModalOpen(false)}
          getEmployees={getEmployees}
        />
      )}
      {isEditing && <EditEmployee isEditing={isEditing} employeeToEdit={employeeToEdit} handleCancel={() => {
        setIsEditing(false)
        setEmployeeToEdit(null)
      }}  />}
      <div className="flex justifyBetween mb-lg">
        <h2>Employees</h2>
        <Button onClick={() => setIsModalOpen(true)} type="primary">
          Add New Employee
        </Button>
      </div>
      <Table
        className="employeeTable"
        loading={!employees.length}
        dataSource={employees}
        columns={columns}
      />
    </>
  );
};

export default Employees;
