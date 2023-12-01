import React, { useEffect, useState } from "react";
import UserAPI from "../api/UserComponentApis/UserAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Card, Col, Row, Statistic, Table } from "antd";
import RoleAPI from "../api/RoleComponentApis/RoleAPI";
import api from "../apiConfig";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [allFiles, setAllFiles] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [deletedUsersCount, setDeletedUsersCount] = useState(0);
  const [staffUsersCount, setStaffUsersCount] = useState(0);

  const fileColumns = [
    // {
    //   title: "#",
    //   dataIndex: "index",
    //   key: "index",
    //   align: "center",
    //   render: (text, record, index) => index + 1,
    // },
    {
      title: "File name",
      dataIndex: "title",
      align: "center",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["ascend", "descend"],
    },
  ];

  const roleColumns = [
    // {
    //   title: "#",
    //   dataIndex: "index",
    //   key: "index",
    //   align: "center",
    //   render: (text, record, index) => index + 1,
    // },
    {
      title: "Role name",
      dataIndex: "title",
      align: "center",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["ascend", "descend"],
    },
  ];

  const userColumns = [
    // {
    //   title: "#",
    //   dataIndex: "index",
    //   key: "index",
    //   align: "center",
    //   render: (text, record, index) => index + 1,
    // },
    {
      title: "Username",
      dataIndex: "username",
      align: "center",
      sorter: (a, b) => a.username.localeCompare(b.username),
      sortDirections: ["ascend", "descend"],
    },
  ];


  const getUserDetails = async () => {
    const result = await UserAPI.getUserDetails();
    if (result.success) {
      console.log(result.response);
      localStorage.setItem("user", JSON.stringify(result.response.data));
      setUser(result.response.data);
    } else {
      if (result.isLogout) {
        localStorage.removeItem("accessToken");
        navigate("/login/");
      } else {
        toast.error(result.error);
      }
    }
  };

  const getAllFiles = async () => {
    // const result = await FileAPI.listAllFiles();
    // if (result.success) {
    //   setAllFiles(result.response.data);
    // } else {
    //   if (result.isLogout) {
    //     localStorage.removeItem("accessToken");
    //     navigate("/login/");
    //   } else {
    //     toast.error(result.error);
    //   }
    // }
    try {
      const response = await api("GET", "/data/get_file_names/", {});
      console.log(response.data.data)
      setAllFiles(response.data.data);
    } catch (error) {
      console.error("GET Request Error:", error);
    }
  };


  const getAllRoles = async () => {
    const result = await RoleAPI.getUserRoles();
    if (result.success) {
      setAllRoles(result.response.data || []);
    } else {
      if (result.isLogout) {
        localStorage.removeItem("accessToken");
        navigate("/login/");
      } else {
        toast.error(result.error);
      }
      console.error("POST Request Error:", result.error);
    }
  };

  const getAllUsers = async () => {
    const result = await UserAPI.getUserList();
    if (result.success) {
      console.log(result.response.data.user_list)
      const users = result.response.data.user_list || [];

      // Count total users, deleted users, and staff users
      const totalUsers = users.length;
      const deletedUsers = users.filter((user) => user.is_deleted).length;
      const staffUsers = users.filter((user) => user.is_staff).length;

      // Update the state using the state updater function
      setTotalUsersCount(() => totalUsers);
      setDeletedUsersCount(() => deletedUsers);
      setStaffUsersCount(() => staffUsers);

      // Update the state using the state updater function
      setAllUsers(() => users);
    } else {
      if (result.isLogout) {
        localStorage.removeItem("accessToken");
        navigate("/login/");
      } else {
        toast.error(result.error.response.data.error);
      }
    }
  };

  useEffect(() => {
    getAllUsers();
    getAllFiles();
    getUserDetails();
    getAllRoles();
  }, []);


  // Calculate statistics by category
  const calculateStatisticsByCategory = () => {
    const statisticsByCategory = {};

    allFiles.forEach((file) => {
      const category = file.category_name || "Uncategorized";

      if (!statisticsByCategory[category]) {
        statisticsByCategory[category] = {
          totalFiles: 0,
          totalSize: 0,
        };
      }

      statisticsByCategory[category].totalFiles += 1;
      // Add more file properties for calculations, e.g., file size
      // statisticsByCategory[category].totalSize += file.size;
    });

    return statisticsByCategory;
  };

  const statisticsByCategory = calculateStatisticsByCategory();

  return (
    <div style={{ margin: "20px" }}>
      {user && (
        <p style={{ fontSize: "24px", textAlign: "left" }}>
          Welcome, {user.username}
        </p>
      )}

      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flex: "0 0 60%", backgroundColor: "#ccc" }}>
          <div style={{ width: "100%", padding: "10px", backgroundColor: "#fff" }}>
            {/* <p style={{ fontSize: "18px", textAlign: "left", marginBottom: "10px" }}>Files</p>
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <Table dataSource={allFiles} columns={fileColumns} pagination={false} />
            </div> */}
            <Card title="File Statistics by Category" bordered={false} style={{
              fontWeight: "bold",
            }}>
              <Row style={{ justifyContent: "center" }} gutter={16}>
                {Object.keys(statisticsByCategory).map((category, index) => (
                  <Col span={6} key={index}>
                    <Statistic
                      title={category}
                      value={statisticsByCategory[category].totalFiles}
                    />
                  </Col>
                ))}
              </Row>
            </Card>
          </div>
          <div style={{ width: "100%", padding: "10px", backgroundColor: "#fff", paddingTop:"10px" }}>
            <p style={{ fontSize: "18px", textAlign: "left", marginBottom: "10px" }}>Roles</p>
            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
              <Table dataSource={allRoles} columns={roleColumns} pagination={false} />
            </div>
          </div>
        </div>

        <div style={{ flex: "0 0 40%" }}>
          <div style={{ width: "100%", height: "100%", margin: "10px", padding: "10px", backgroundColor: "#fff" }}>
            {/* <p style={{ fontSize: "18px", textAlign: "left", marginBottom: "10px" }}>Users</p> */}
            {/* <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <Table dataSource={allUsers} columns={userColumns} pagination={false} />
            </div> */}
            <Card title="User Statistics" bordered={false}
              style={{
                width: 350,
                backgroundColor: "#f4f4f4",
                fontWeight: "bold",
              }}>
              <Statistic title="Total Users" value={totalUsersCount} />
              <Statistic title="Deleted Users" value={deletedUsersCount} />
              <Statistic title="Staff Users" value={staffUsersCount} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
