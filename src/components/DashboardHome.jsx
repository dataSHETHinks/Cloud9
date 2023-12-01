import React, { useEffect, useState } from "react";
import UserAPI from "../api/UserComponentApis/UserAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Card, Col, Row, Statistic, Table } from "antd";
import RoleAPI from "../api/RoleComponentApis/RoleAPI";
import api from "../apiConfig";
import CustomLoader from "./CustomLoader";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [allFiles, setAllFiles] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [deletedUsersCount, setDeletedUsersCount] = useState(0);
  const [staffUsersCount, setStaffUsersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  const file_columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      align: "center",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["ascend", "descend"],
    },

    {
      title: "Uploaded By",
      dataIndex: "uploaded_by_username",
      align: "center",
      sorter: (a, b) =>
        a.uploaded_by_username.localeCompare(b.uploaded_by_username),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Uploaded At",
      dataIndex: "uploaded_at",
      align: "center",
      sorter: (a, b) => new Date(a.uploaded_at) - new Date(b.uploaded_at),
      sortDirections: ["ascend", "descend"],
    },

    {
      title: "Action",
      dataIndex: "id",
      align: "center",
      render: (id) => <Link to={`/FileDetails/${id}`}>View Details</Link>,
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
    setIsLoading(true);
    try {
      const result = await UserAPI.getUserDetails();
      if (result.success) {
        setUser(result.response.data);
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

  const getAllFiles = async () => {
    setIsLoading(true);
    try {
      const response = await api("GET", "/data/get_file_names/", {});
      setAllFiles(response.data.data);
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error(
          "Server did not respond. Contact admin or try again later."
        );
      } else if (
        error.response.status === 404 ||
        error.response.staus === 401
      ) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong.");
      }
    }
    setIsLoading(false);
  };

  const getAllRoles = async () => {
    setIsLoading(true);
    try {
      const result = await RoleAPI.getUserRoles();
      if (result.success) {
        setAllRoles(result.response.data || []);
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

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const result = await UserAPI.getUserList();
      if (result.success) {
        console.log(result.response.data.user_list);
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
    <>
      {isLoading ? (
        <div className="centered-loader">
          <CustomLoader />
        </div>
      ) : null}
      <div>
        {user && (
          <p
            style={{
              fontSize: "24px",
              textAlign: "left",
              marginTop: "-10px",
              marginLeft: "10px",
            }}
          >
            Welcome {user.first_name}
          </p>
        )}

        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flex: "0 0 60%", backgroundColor: "#ccc" }}>
            <div
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#fff",
              }}
            >
              {/* <p style={{ fontSize: "18px", textAlign: "left", marginBottom: "10px" }}>Files</p>
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <Table dataSource={allFiles} columns={fileColumns} pagination={false} />
            </div> */}
              <Card
                title="File Statistics by Category"
                bordered={false}
                style={{
                  fontWeight: "bold",
                  marginTop: "-20px",
                  width: "900px",
                  fontSize: "18px",
                  textAlign: "center",
                }}
              >
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
            <div
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#fff",
                paddingTop: "10px",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                Last Uploaded Files
              </p>
              <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                <Table
                  dataSource={allFiles}
                  columns={file_columns}
                  pagination={false}
                />
              </div>
            </div>
          </div>

          <div style={{ flex: "0 0 40%" }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                margin: "10px",
                padding: "10px",
                backgroundColor: "#fff",
              }}
            >
              {/* <p style={{ fontSize: "18px", textAlign: "left", marginBottom: "10px" }}>Users</p> */}
              {/* <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <Table dataSource={allUsers} columns={userColumns} pagination={false} />
            </div> */}
              <Card
                title="User Statistics"
                bordered={false}
                style={{
                  width: 250,
                  backgroundColor: "#f4f4f4",
                  fontWeight: "bold",
                  marginTop: "-35px",
                  marginLeft: "20px",
                }}
              >
                <Statistic title="Total Users" value={totalUsersCount} />
                {/* <Statistic title="Deleted Users" value={deletedUsersCount} />
                <Statistic title="Staff Users" value={staffUsersCount} /> */}
              </Card>
              <p
                style={{
                  fontSize: "18px",
                  marginRight: "175px",
                  marginBottom: "10px",
                  marginTop: "50px",
                }}
              >
                Roles
              </p>
              <Table
                dataSource={allRoles}
                columns={roleColumns}
                pagination={false}
                style={{ width: 250, marginLeft: 20, marginTop: 20 }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
