import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Descriptions,
  Button,
} from "antd";
import { useParams } from "react-router-dom";
import api from "../apiConfig";
import "../App.css";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please Input ${title}!` }]}
          // initialValue={record[dataIndex]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const DynamicEditableTable = () => {
  const { id } = useParams();

  const [fileId, setFileId] = useState("");
  const [updatedRowNum, setUpdatedRowNum] = useState("");
  const [updatedRowData, setUpdatedRowData] = useState("");

  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [fileDetails, setFileDetails] = useState({});
  const [idxCols, setIdxCols] = useState([]);

  const isEditing = (record) => record.key === editingKey;

  useEffect(() => {
    const getFileData = async () => {
      try {
        const response = await api("GET", `/data/get_file_data/?id=${id}`);

        if (response && response.data.data.data) {
          const fileData = response.data;
          setFileId(fileData.data.id);
          const sampleObject = fileData.data.data;
          const details = {
            category_name: fileData.data.category_name,
            uploaded_by_username: fileData.data.uploaded_by_username,
            uploaded_at: fileData.data.uploaded_at,
            modified_at: fileData.data.modified_at,
          };
          setFileDetails(details);
          const keys = Object.keys(sampleObject[1]);
          const newColumns = keys.map((key) => ({
            title: key,
            dataIndex: key,
            key: key,
            width: 150,
            editable: true,
            align: "center",
          }));

          // Insert 'idx' column configuration at the beginning
          const idxColumn = {
            title: "Idx",
            dataIndex: "idx",
            key: "idx",
            width: 80,
            render: (_, record) => record.index, // render index number in each row
            fixed: "left",
            align: "center",
          };
          setIdxCols(idxColumn);
          setColumns(newColumns);

          const dataSource = Object.entries(sampleObject).map(
            ([key, item]) => ({
              ...item,
              key,
              index: key,
            })
          );
          setDataSource(dataSource);
        } else {
          console.error("Empty or invalid response data");
        }
      } catch (error) {
        console.error("GET Request Error:", error);
      }
    };

    getFileData();
  }, [id]);

  const editRow = (record) => {
    form.setFieldsValue({
      Delta: "",
      Value: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      console.log("inside save");
      const values = await form.validateFields(); // Capture validated form values
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        const updatedRowData = {
          ...item,
          ...values,
          idx: item.index,
        };
        newData.splice(index, 1, {
          ...item,
          ...values,
        });
        setDataSource(newData);
        setEditingKey("");

        const { idx, ...restWithoutIdx } = updatedRowData;

        const seprateData = { ...restWithoutIdx };

        setUpdatedRowNum(String(idx));
        setUpdatedRowData(JSON.stringify(seprateData));
      } else {
        newData.push(values);
        setDataSource(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const operationColumn = {
    title: "Operation",
    dataIndex: "operation",
    width: 120,
    fixed: "left",
    align: "center",
    render: (_, record) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <Typography.Link
            onClick={() => save(record.key)}
            style={{ marginRight: 8 }}
          >
            Save
          </Typography.Link>
          <Popconfirm
            title="Confirm?"
            onConfirm={cancel}
            style={{ width: "500px" }}
          >
            <Typography.Link>Cancel</Typography.Link>
          </Popconfirm>
        </span>
      ) : (
        <Typography.Link
          disabled={editingKey !== ""}
          onClick={() => editRow(record)}
        >
          Edit
        </Typography.Link>
      );
    },
  };

  const updatedMergedColumns = [operationColumn, idxCols, ...mergedColumns];

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
        <Descriptions.Item label="Download this file">
          <Button
            type="primary"
            // onClick={showModal}
            size="Large"
            style={{ width: "200px", align: "center" }}
          >
            Download
          </Button>
        </Descriptions.Item>
      </Descriptions>
      <Form form={form} component={false}>
        <Table
          scroll={{ x: "max-content", y: window.innerHeight - 450 }}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={dataSource}
          columns={updatedMergedColumns}
          rowClassName="editable-row"
          pagination={false}
          onRow={(record) => ({
            onClick: () => {
              if (editingKey !== record.key) {
                editRow(record);
              }
            },
          })}
        />
      </Form>
    </>
  );
};

export default DynamicEditableTable;
