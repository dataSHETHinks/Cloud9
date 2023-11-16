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
                const result = await CategoryAPI.getAllCategory();
                if (result.success) {
                    
                    setAllCategorys(Array.isArray(result.response.data) ? result.response.data : []);
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
    }, [navigate]); 

    const tableHeight = window.innerHeight - 300;

    return (
        <div className="list-Categorys-table-responsive">
            <Table
                dataSource={allCategorys}
                columns={[{ title: 'Category Name', dataIndex: 'name', key: 'name' }]}
                rowKey="id"
                scroll={{ y: tableHeight }}
            />
        </div>
    );
};

export default ListCategorys;