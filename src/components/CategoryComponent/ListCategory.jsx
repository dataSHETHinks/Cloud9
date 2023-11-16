import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import CategoryAPI from "../../api/CategoryComponentApis/CategoryAPI";


const ListCategorys = () => {
    const navigate = useNavigate();
    const [allCategorys, setAllCategorys] = useState([]);

    useEffect(() => {
        const fetchCategorys = async () => {
            try {
                const result = await CategoryAPI.getAllCategories();
                if (result.success) {

                    setAllCategorys(result.response.data.data || [])
                } else {
                    if (result.isLogout) {
                        localStorage.removeItem("accessToken");
                        navigate("/login/");
                    } else {
                        alert(result.error);
                    }
                }
            } catch (error) {
                console.error("Error fetching Categorys:", error);
                alert('An error occurred while fetching Categorys');
            }
        };

        fetchCategorys();
    }, []);

    const tableHeight = window.innerHeight - 300;

    const columns = allCategorys.length > 0 ? [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        ...Object.keys(allCategorys[0]).filter((key) => key !== "id").map((key) => ({
            title: key,
            dataIndex: key,
            key: key,
            align: 'center',
            render: (text, record) => {
                return text;
            },
        })),
    ] : [];

    return (
        <div className="list-Categorys-table-responsive">
            <Table
                dataSource={allCategorys}
                columns={columns}
                pagination={false}
                locale={{ emptyText: <h2>No categories added</h2> }}
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

export default ListCategorys;