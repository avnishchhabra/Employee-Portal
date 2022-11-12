import {
  UserOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  StockOutlined,
} from "@ant-design/icons";

export default [
  {
    key: 1,
    label: "Trainings",
    icon: <UserOutlined />,
    path: '/'
  },
  {
    key: 2,
    label: "Performance Score",
    icon: <StockOutlined />,
    path: '/performance'
  },
  {
    key: 3,
    label: "Hazard",
    icon: <WarningOutlined />,
    path: '/hazard'
  },
  {
    key: 4,
    label: "Grievance",
    icon: <InfoCircleOutlined />,
    path: '/grievance'
  },
];
