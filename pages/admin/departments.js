import { Button, Table, Form, Input } from "antd";
import axios from "../../hoc/axios";
import React, { useEffect, useState } from "react"
import CustomDrawer from '../../components/CustomDrawer'
import { useDispatch, useSelector } from 'react-redux'
import UiActions from "../../redux/slices/UiSlice";
import { errorNotification } from "../../components/notification";

const Grievance = () => {
    const [departments, setDepartments] = useState();
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.ui.loading);
    useEffect(() => {
        getGrievances();
    }, []);
    const getGrievances = () =>
        axios
            .get(`departments/`)
            .then((res) => setDepartments(res.data));

    const columns = [

        {
            title: "Department ID",
            dataIndex: "id",
            key: "name",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },

    ]

    const submit = (data) => {
        dispatch(UiActions.actions.setLoading(true));
        data['status'] = true
        axios.post(`departments/`, data).then((response) => {
            getGrievances()
            notification.success({
                message: "Department added successfully",
            });
            dispatch(UiActions.actions.setLoading(false));
            setRaiseGrievance(false)
        }).catch(err => {
            dispatch(UiActions.actions.setLoading(false));
            errorNotification({
                message: 'Error',
                description: 'Something went wrong',
                duration: 2,
            })
        })

    }
    return (
        <>
            <div className="flex justifyBetween mb-lg">
                <h2>Departments</h2>
                <Button onClick={() => setVisible(true)} type="primary">
                    Add Department
                </Button>
            </div>
            <Table
                loading={!departments}
                columns={columns}
                dataSource={departments}
                pagination={false}
            />


            <CustomDrawer
                onClose={() => setVisible(false)}
                open={visible}
                title="Add Department"
            >
                <Form layout="vertical" onFinish={submit}>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Please input title",
                            },
                        ]}
                        name="name"
                        label='Name'
                    >
                        <Input placeholder="Enter name" />
                    </Form.Item>

                    <div className="flex gap-lg">
                        <Button key="back" onClick={() => setVisible(false)}>
                            Cancel
                        </Button>
                        <Button type="primary" loading={loading} htmlType="submit" key="add">
                            Submit
                        </Button>
                    </div>
                </Form>
            </CustomDrawer>
        </>
    );
};

export default Grievance;
