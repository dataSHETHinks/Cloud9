import React, { useEffect, useState } from "react";
import {
  Table,
  Descriptions,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Typography,
} from "antd";
import { useParams } from "react-router-dom";
import api from "../apiConfig";

const FileDetailsPage = () => {
  const { id } = useParams();
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [fileDetails, setFileDetails] = useState({});

  useEffect(() => {
    const getFileData = async () => {
      try {
        const response = await api("GET", `/data/get_file_data/?id=${id}`);
        if (response && response.data.data.data) {
          const fileData = response.data;
          const sampleObject = fileData.data.data; // Assuming the object is stored in 'sampleObject'
          const details = {
            category_name: fileData.data.category_name,
            uploaded_by_username: fileData.data.uploaded_by_username,
            uploaded_at: fileData.data.uploaded_at,
            modified_at: fileData.data.modified_at,
          };
          setFileDetails(details);
          if (sampleObject && Object.keys(sampleObject).length > 0) {
            const keys = Object.keys(sampleObject[1]); // Using keys from the first object (assuming keys are consistent)
            const dataSource = Object.entries(sampleObject).map(
              ([key, item]) => ({
                ...item,
                key, // Set the 'key' field to the corresponding index
                index: key, // Additional field for index, if needed
              })
            );
            const indexColumn = {
              title: "Index",
              dataIndex: "index",
              key: "index",
              render: (text, record, index) => <span>{index + 1}</span>,
            };
            const newColumns = [
              indexColumn, // Include the Index column as the first column
              ...keys.map((key) => ({
                title: key,
                dataIndex: key,
                key: key,
                width: 150, // Set a fixed width for columns (adjust as needed)
              })),
            ];
            setColumns(newColumns);
            setDataSource(dataSource);
          } else {
            console.error("Invalid data structure received");
          }
        } else {
          console.error("Empty or invalid response data");
        }
      } catch (error) {
        console.error("GET Request Error:", error);
      }
    };

    getFileData(); // Fetch data only on the initial render
  }, [id]);
  return (
    <>
      <Descriptions title="File Details" bordered style={{ marginBottom: 20 }}>
        <Descriptions.Item label="Category Name">
          {fileDetails.category_name}
        </Descriptions.Item>
        <Descriptions.Item label="Uploaded By">
          {fileDetails.uploaded_by_username}
        </Descriptions.Item>
        <Descriptions.Item label="Uploaded At">
          {fileDetails.uploaded_at}
        </Descriptions.Item>
        <Descriptions.Item label="Modified At">
          {fileDetails.modified_at}
        </Descriptions.Item>
      </Descriptions>
      <div style={{ overflowX: "auto" }}>
        <Form form={form} component={false}>
          <Table
            dataSource={dataSource}
            columns={columnsWithEdit}
            bordered
            pagination={false}
            scroll={{ x: "max-content", y: 345 }}
            rowKey="key"
          />
        </Form>
      </div>
    </>
  );
};

export default FileDetailsPage;
