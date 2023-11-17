import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import ModuleAPI from "../../api/ModuleComponentApis/ModuleAPI";


const ListModules = () => {
    const navigate = useNavigate();
    const [allModules, setAllModules] = useState([]);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const result = await ModuleAPI.getAllModules();
                if (result.success) {

                    setAllModules(result.response.data.data || [])
                } else {
                    if (result.isLogout) {
                        localStorage.removeItem("accessToken");
                        navigate("/login/");
                    } else {
                        alert(result.error);
                    }
                }
            } catch (error) {
                console.error("Error fetching Modules:", error);
                alert('An error occurred while fetching Modules');
            }
        };

        fetchModules();
    }, []);

    const tableHeight = window.innerHeight - 300;

    const columns = allModules.length > 0 ? [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        ...Object.keys(allModules[0]).filter((key) => key !== "id").map((key) => ({
            title: 'Name',
            dataIndex: key,
            key: key,
            align: 'center',
            render: (text, record) => {
                return text;
            },
        })),
    ] : [];

    return (
        <div className="list-Modules-table-responsive">
            <Table
                dataSource={allModules}
                columns={columns}
                pagination={false}
                locale={{ emptyText: <h2>No Modules Added</h2> }}
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

export default ListModules;