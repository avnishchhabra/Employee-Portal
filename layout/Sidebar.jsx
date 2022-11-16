import {
  SettingOutlined,
  PlusCircleOutlined,
  UsergroupAddOutlined,
  MessageOutlined,
  WarningOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Layout, Menu } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const { Sider } = Layout;
import LS from "../utils/Ls";
import SidebarItems from "../utils/SidebarItems";

const Sidebar = ({ setCollapsed }) => {
  const router = useRouter();
  const [employee, setEmployee] = useState();
  useEffect(() => {
    setEmployee(JSON.parse(LS.get("user")));
  }, []);
  return (
    <Sider
      style={{
        float: "right",
        paddingTop: "2vh",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
      }}
      breakpoint="sm"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        setCollapsed(collapsed);
      }}
    // reverseArrow={true}
    >
      <div className="flex justifyCenter mt-md">
        <Avatar src="https://joeschmoe.io/api/v1/random" />
      </div>
      <div className="center mt-lg">
        <h2 className="md white">Hi {JSON.parse(LS.get("user")).name}</h2>

      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        // items={SidebarItems}
        className="mt-sm"
      >
        {SidebarItems.map((item) => (
          <Menu.Item
            onClick={() => router.push(item.path)}
            key={item.key}
            icon={item.icon}
            title={item.label}
          >
            {item.label}
          </Menu.Item>
        ))}
        {employee?.type == "admin" && (
          <Menu.SubMenu icon={<SettingOutlined />} title="Admin Options">
            <Menu.Item
              onClick={() => router.push("/admin/trainings")}
              key={20}
              icon={<MessageOutlined />}
            >
              Trainings
            </Menu.Item>
            <Menu.Item
              onClick={() => router.push("/admin/addQuestions")}
              key={25}
              icon={<PlusCircleOutlined />}
            >
              Add questions
            </Menu.Item>
            <Menu.Item
              onClick={() => router.push("/admin/employees")}
              key={10}
              icon={<UsergroupAddOutlined />}
            >
              Employees
            </Menu.Item>
            <Menu.Item
              onClick={() => router.push("/admin/hazards")}
              key={30}
              icon={<WarningOutlined />}
            >
              Hazards
            </Menu.Item>
            <Menu.Item
              onClick={() => router.push("/admin/grievances")}
              key={35}
              icon={<InfoCircleOutlined />}
            >
              Grievances
            </Menu.Item>

            <Menu.Item
              onClick={() => router.push("/admin/departments")}
              key={36}
              icon={<InfoCircleOutlined />}
            >
              Departments
            </Menu.Item>
          </Menu.SubMenu>
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
