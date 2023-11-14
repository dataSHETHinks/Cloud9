import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  ClusterOutlined,
  FileTextOutlined,
  UsergroupAddOutlined,
  MergeCellsOutlined,
  UnorderedListOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import logoImage from "../../assets/companylogo.png";
import {
  useRoutes,
  Link,
  useNavigate,
  BrowserRouter as Router,
} from "react-router-dom";
import FilePage from "../../pages/FilePage";
import UsersPage from "../../pages/UsersPage";
import RolesPage from "../../pages/RolesPage";
import ModulesPage from "../../pages/ModulesPage";
import CategoriesPage from "../../pages/CategoriesPage";
import FileDetailsPage from "../../pages/FileDetailsPage";
import DashboardHome from "../DashboardHome";

const BaseLayout = ({ componentToRender: Component }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    console.log("Path is");
    console.log(path);
    navigate(path);
  };

  const { Header, Sider, Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const logoTransitionClass = collapsed ? "logo-collapsed" : "logo-expanded";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={`demo-logo-vertical ${logoTransitionClass}`}>
          <img
            src={logoImage}
            alt="Logo"
            style={{
              margin: "10px",
              height: "70%",
              width: "70%",
            }}
          />
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => {
            switch (key) {
              case "1":
                handleNavigate("/Files");
                break;
              case "2":
                handleNavigate("/Users");
                break;
              case "3":
                handleNavigate("/Roles");
                break;
              case "4":
                handleNavigate("/Modules");
                break;
              case "5":
                handleNavigate("/Categories");
                break;
              case "6":
                handleNavigate("/Settings");
                break;
              case "7":
                handleNavigate("/Logout");
                break;
              case "8":
                handleNavigate("/");
                break;
              // Add other cases for different menu items
              default:
                break;
            }
          }}
          items={[
            {
              key: "8",
              icon: <HomeOutlined />,
              label: "Home",
              onClick: () => handleNavigate("/"),
            },
            {
              key: "1",
              icon: <FileTextOutlined />,
              label: "Files",
              onClick: () => handleNavigate("/Files"),
            },
            {
              key: "2",
              icon: <UsergroupAddOutlined />,
              label: "Users",
              link: "/Files",
            },
            {
              key: "3",
              icon: <ClusterOutlined />,
              label: "Roles",
              link: "/Files",
            },
            {
              key: "4",
              icon: <MergeCellsOutlined />,
              label: "Modules",
              link: "/Files",
            },
            {
              key: "5",
              icon: <UnorderedListOutlined />,
              label: "Categories",
              link: "/Files",
            },
            {
              key: "6",
              icon: <SettingOutlined />,
              label: "Settings",
              link: "/Files",
            },
            {
              key: "7",
              icon: <LogoutOutlined rotate={180} />,
              label: "Log Out",
              link: "/Files",
            },
            // Add other menu items with their corresponding links here
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              marginRight: 16,
              marginTop: 0,
              float: "left",
            }}
          />
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {Component && <Component />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
