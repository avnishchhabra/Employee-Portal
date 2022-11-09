import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
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
    icon: <UserOutlined />,
    // children: [],
    path: '/performance'
  },
  {
    key: 3,
    label: "Hazard",
    icon: <UserOutlined />,
    // children: [],
    path: '/hazard'
  },
  {
    key: 4,
    label: "Grievance",
    icon: <UserOutlined />,
    // children: [],
    path: '/grievance'
  },
];
