import moment from "moment";

export default [
    {
        title: "Name",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "Type",
        dataIndex: "type",
        key: "type",
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
    },
    {
        title: "Remarks",
        dataIndex: "remarks",
        key: "remarks",
    },
    {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (_, hazard) => <p>{moment(hazard.created_at).format('DD MMM, YYYY')}</p>
    },
    {
        title: "Hazard Feedback",
        dataIndex: "hazard_feedback",
        key: "hazard_feedback",
    },
]