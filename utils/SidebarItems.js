import {
  WarningOutlined,
  InfoCircleOutlined,
  StockOutlined,
  MessageOutlined
} from "@ant-design/icons";

export default [
  {
    key: 1,
    label: "Trainings",
    icon: <MessageOutlined />,
    path: '/'
  },
  {
    key: 2,
    label: "Dashboard",
    icon: <StockOutlined />,
    path: '/dashboard'
  },
  {
    key: 3,
    label: "Performance Score",
    icon: <StockOutlined />,
    path: '/performance'
  },
  {
    key: 4,
    label: "Hazard",
    icon: <WarningOutlined />,
    path: '/hazard'
  },
  {
    key: 5,
    label: "Grievance",
    icon: <InfoCircleOutlined />,
    path: '/grievance'
  },
];
