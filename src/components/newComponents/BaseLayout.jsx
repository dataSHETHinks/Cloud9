import React, { useEffect, useState } from "react";
import AuthAPI from "../../api/AuthComponentApis/AuthAPI";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  ClusterOutlined,
  FileTextOutlined,
  UsergroupAddOutlined,
  MergeCellsOutlined,
  UnorderedListOutlined,
  SettingOutlined,
  LogoutOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import logoImage from "../../assets/companylogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import CustomLoader from "../CustomLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BaseLayout = ({ componentToRender: Component }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const location = useLocation(); // Get the current location object
  const [selectedKey, setSelectedKey] = useState("8"); // Set default selectedKey
  const [pageTitle, setPageTitle] = useState("Home");

  useEffect(() => {
    // Function to parse the URL and set the selectedKey based on it
    const updateSelectedKey = () => {
      const paths = location.pathname.split("/").filter(Boolean); // Split the URL path
      const currentPath = paths[0]; // Consider the first part of the path (if necessary)
      console.log(currentPath);

      // Logic to map the path to the corresponding selectedKey
      switch (currentPath) {
        case "Files":
          setSelectedKey("1");
          setPageTitle("Files");
          break;
        case "FilesHistory":
          setSelectedKey("2");
          setPageTitle("Files History");
          break;
        case "Users":
          setSelectedKey("3");
          setPageTitle("Users");
          break;
        case "Roles":
          setSelectedKey("4");
          setPageTitle("Roles");
          break;
        case "Modules":
          setSelectedKey("5");
          setPageTitle("Modules");
          break;
        case "Categories":
          setSelectedKey("6");
          setPageTitle("Categories");
          break;
        case "ChangePassword":
          setSelectedKey("7");
          setPageTitle("Change Password");
          break;
        case "FileDetails":
          setPageTitle("File Details");
          break;
        case "FileHistoryDetail":
          setPageTitle("File History");
          break;
        default:
          setSelectedKey("9"); // Default to Home if no match
          setPageTitle("Home");
          break;
      } 
    };

    updateSelectedKey(); // Call the function initially
  }, [location.pathname]);

  const { Header, Sider, Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const logoTransitionClass = collapsed ? "logo-collapsed" : "logo-expanded";

  const handleLogout = async (e) => {
    setIsLoading(true);
    try {
      const result = await AuthAPI.logout();

      if (result.success) {
        localStorage.removeItem("accessToken");
        toast.success("You have been logged out.");
        navigate("/login/");
      }
    } catch (error) {
      toast.error(error.error);
      if (error.isLogout) {
        localStorage.removeItem("accessToken");
        navigate("/login/");
      }
    }
    setIsLoading(false);
  };

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
          {!collapsed && (
            <div style={{ color: "#fff", fontSize: "18px", textAlign: "center", marginTop: "10px" }}>
              FETHERSTILL INC
            </div>
          )}
          <br/>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          defaultSelectedKeys={["8"]}
          onClick={({ key }) => {
            switch (key) {
              case "1":
                handleNavigate("/Files");
                break;
              case "2":
                handleNavigate("/FilesHistory");
                break;
              case "3":
                handleNavigate("/Users");
                break;
              case "4":
                handleNavigate("/Roles");
                break;
              case "5":
                handleNavigate("/Modules");
                break;
              case "6":
                handleNavigate("/Categories");
                break;
              case "7":
                handleNavigate("/ChangePassword");
                break;
              case "8":
                handleLogout();
                break;
              case "9":
                handleNavigate("/");
                break;
              default:
                break;
            }
          }}
          items={[
            {
              key: "9",
              icon: <HomeOutlined />,
              label: "Home",
              link: "/",
            },
            {
              key: "1",
              icon: <FileTextOutlined />,
              label: "Files",
              link: "/Files",
            },
            {
              key: "2",
              icon: <HistoryOutlined />,
              label: "Files History",
              link: "/FilesHistory",
            },
            {
              key: "3",
              icon: <UsergroupAddOutlined />,
              label: "Users",
              link: "/Users",
            },
            {
              key: "4",
              icon: <ClusterOutlined />,
              label: "Roles",
              link: "/Roles/",
            },
            {
              key: "5",
              icon: <MergeCellsOutlined />,
              label: "Modules",
              link: "/Modules/",
            },
            {
              key: "6",
              icon: <UnorderedListOutlined />,
              label: "Categories",
              link: "/Categories",
            },
            {
              key: "7",
              icon: <SettingOutlined />,
              label: "Change Password",
              link: "/ChangePassword",
            },
            {
              key: "8",
              icon: <LogoutOutlined rotate={180} />,
              label: "Log Out",
              // link: "/Files",
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
              marginRight: -17,
              marginTop: 0,
              float: "left",
            }}
          />
          {collapsed && (
            <div style={{ color: "#000", fontFamily: "Arial, sans-serif", fontSize: "18px", marginTop : "-15px", fontWeight: "bold", float: "left", padding: "16px", marginRight:"-20px"}}>
              FETHERSTILL INC
            </div>
          )}

          {(
            <div style={{ color: "#000", fontFamily: "Arial, sans-serif", fontSize: "18px", marginTop : "-15px", float: "right", padding: "16px", marginRight:"10px"}}>
              {pageTitle}
            </div>
          )}
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {isLoading ? (
            <div className="centered-loader">
              <CustomLoader />
            </div>
          ) : null}
          {Component && <Component />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
