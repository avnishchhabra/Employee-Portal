import { Table, Button } from "antd";
import axios from "../../hoc/axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LS from "../../utils/Ls";


const EmployeeDetails = () => {
    const [training, setTraining] = useState(null);
    const [loading, setLoading] = useState(false)
    const user = JSON.parse(LS.get("user"))
    const router = useRouter()
    const { id } = router.query;
    useEffect(() => {
        if (id) {
            setLoading(true)
            axios.get(`employee/assessments/${id}`).then((res) => {
                setTraining(res.data);
                setLoading(false)
            });
        }
    }, [id]);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",

        },
        {
            title: "Training Name",
            dataIndex: "training",
            key: "title",

        },

        {
            title: "Score",
            dataIndex: "score",
            key: "score",

        },
        {
            title: "Is Completed",
            dataIndex: "score",
            key: "score",
            render: score => score ? 'Yes' : 'No'

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
                    View
                </Button>


            ),
        },
    ]
    return (
        <>
            <Table
                title={() => 'Assigned Trainings'}
                loading={loading}
                dataSource={training && training.data}
                columns={columns}
                pagination={false}
            />
        </>
    )

};

export default EmployeeDetails;
