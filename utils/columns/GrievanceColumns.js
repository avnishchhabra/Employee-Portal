import moment from "moment";

export default [
    {
        title: "Name",
        dataIndex: "title",
        key: "title",
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
        render: (_, grievance) => <p>{moment(grievance.created_at).format('DD MMM, YYYY')}</p>
    },
    {
        title: 'Closed At',
        dataIndex: 'closed_at',
        key: 'closed_at',
        render: (_, grievance) => <p>{moment(grievance.created_at).format('DD MMM, YYYY')}</p>
    },
    {
        title: 'Closed by',
        dataIndex: 'closed_by',
        key: 'closed_by'
    },
]