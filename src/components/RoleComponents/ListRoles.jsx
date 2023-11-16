import React, { useState, useEffect } from "react";
import { Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import RoleAPI from "../../api/RoleComponentApis/RoleAPI";

const ListRoles = () => {
    const navigate = useNavigate();
    const [allRoles, setAllRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            const result = await RoleAPI.getUserRoles();
            if (result.success) {
                setAllRoles(result.response.data || []);
            } else {
                if (result.isLogout) {
                    localStorage.removeItem("accessToken");
                    navigate("/login/");
                } else {
                    alert(result.error);
                }
                console.error("POST Request Error:", result.error);
            }
        };

        fetchRoles();
    }, []);

    const columns = allRoles.length > 0 ? [
        {
          title: "#",
          dataIndex: "index",
          key: "index",
          align: "center",
          render: (text, record, index) => index + 1,
        },
        ...Object.keys(allRoles[0]).filter((key) => key !== "id").map((key) => ({
          title: key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
          dataIndex: key,
          key: key,
          align: 'center',
          render: (text, record) => {
            if (typeof record[key] === 'boolean') {
              return record[key] ? <span style={{ color: 'green' }}>True</span> : <span style={{ color: 'red' }}>False</span>;
            }
            return text;
          },
        })),
      ] : [];

    const tableHeight = window.innerHeight - 300;

    return (
        <div className="list-roles-table-responsive">
            <Table
                dataSource={allRoles}
                columns={columns}
                pagination={false}
                locale={{ emptyText: <h2>No roles added</h2> }}
                bordered
                header={{
                    style: {
                        textAlign: 'center',
                    },
                }}
                scroll={{ y: tableHeight }}
            />
        </div>
    );
};

export default ListRoles;
