import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Layout, Menu } from "antd";
import React, { useState } from "react";
const { Header, Sider, Content } = Layout;
import { isMobile } from "react-device-detect";
import SidebarItems from "../utils/SidebarItems";

const Sidebar = ({ collapsed, setCollapsed }) => {
  return (
    <Sider
      style={{
        height: "100vh",
        float: 'right',
        paddingTop: '2vh'
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
        items={SidebarItems}
        className="mt-sm"
      />
    </Sider>
  );
};

export default Sidebar;
