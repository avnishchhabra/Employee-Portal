import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Button, Layout, Menu, Space } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { isMobile } from "react-device-detect";
import LS from "../utils/Ls";
import LogoutModal from "../components/modals/LogoutModal";
import { useEffect } from "react";
const { Header, Sider, Content } = Layout;

const Index = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const logout = () => {
    setIsModalOpen(true);
  };
  
  return (
    <Layout>
      {isModalOpen && (
        <LogoutModal
          isModalOpen={isModalOpen}
          handleCancel={() => setIsModalOpen(false)}
        />
      )}
      <div>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <Layout className="site-layout">
        {
          <Header
            className="site-layout-background"
            style={{
              background: "#fff",
              padding: "0 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Space>
              <Button
                shape="circle"
                icon={<LogoutOutlined />}
                htmlType="submit"
                className="login-form-button"
                danger
                onClick={logout}
              />
            </Space>
          </Header>
        }
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Index;
