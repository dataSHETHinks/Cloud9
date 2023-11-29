import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import api from "../apiConfig";
import { toast } from "react-toastify";

const columns = [
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
        title: "Modified At",
        dataIndex: "modified_at",
        align: "center",
        sorter: (a, b) => new Date(a.modified_at) - new Date(b.modified_at),
        sortDirections: ["ascend", "descend"],
    },
    {
        title: "Action",
        dataIndex: "id", // Assuming 'id' is the unique identifier for files
        align: "center",
        render: (id) => <Link to={`/FileHistoryDetail/${id}`}>View Details</Link>,
    },
];

const FileHistoryPage = () => {
    const [allHistoryFiles, setAllHistoryFiles] = useState([]);

    useEffect(() => {
        const getAllHistoryFiles = () => {
            try {
                api("GET", "/data/get_file_history_names/", {}).then((response) => {
                    setAllHistoryFiles(response.data.data);
                }).catch((error) => {
                    toast.error(error)
                })

            } catch (error) {
                toast.error(error)
            }
        };

        getAllHistoryFiles();
    }, []);

    return (
        <div>
            <Table
                dataSource={allHistoryFiles}
                columns={columns}
                scroll={{ y: 460 }}
                pagination={false}
            />
        </div>
    );
};

export default FileHistoryPage;
