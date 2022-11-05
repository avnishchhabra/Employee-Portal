import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Layout, Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const { Header, Sider, Content } = Layout;
import { isMobile } from "react-device-detect";
import LS from "../utils/Ls";
import SidebarItems from "../utils/SidebarItems";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const router = useRouter();
  const [employee, setEmployee] = useState();
  useEffect(() => {
    setEmployee(JSON.parse(LS.get("user")));
  }, []);
  return (
    <Sider
      style={{
        height: "100vh",
        float: "right",
        paddingTop: "2vh",
      }}
      breakpoint="sm"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
        setCollapsed(collapsed);
      }}
      // reverseArrow={true}
    >
      <div className="flex justifyCenter">
        <Avatar src="https://joeschmoe.io/api/v1/random" />
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
          <Menu.SubMenu icon={<UserOutlined />} title='Admin Options' >
            <Menu.Item onClick={() => router.push('/employeesList')} key={10} icon={<UserOutlined />}>
              Employees List
            </Menu.Item>
            <Menu.Item onClick={() => router.push('/newEmployee')} key={12} icon={<UserOutlined />}>
              Add employee
            </Menu.Item>
          </Menu.SubMenu>
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
