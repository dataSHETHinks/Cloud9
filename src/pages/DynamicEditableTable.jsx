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
  Radio,
  Modal,
  Switch,
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

const DownloadModal = ({ visible, onCancel, onDownload }) => {
  const [downloadType, setDownloadType] = useState("csv");

  const handleDownload = () => {
    onDownload(downloadType);
  };
  return (
    <Modal
      title="Download Options"
      visible={visible}
      onCancel={onCancel}
      onOk={handleDownload}
    >
      <Radio.Group onChange={(e) => setDownloadType(e.target.value)} value={downloadType}>
        <Radio value="csv">Download as CSV</Radio>
        <Radio value="xlsx">Download as Excel</Radio>
      </Radio.Group>
    </Modal>
  );
};

const DynamicEditableTable = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [fileDetails, setFileDetails] = useState({});
  const [idxCols, setIdxCols] = useState([]);
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);
  const [showFileDetails, setShowFileDetails] = useState(false);
  // const navigate = useNavigate();

  const isEditing = (record) => record.key === editingKey;

  useEffect(() => {
    const getFileData = async () => {
      try {
        const response = await api("GET", `/data/get_file_data/?id=${id}`);

        if (response && response.data.data.data) {
          const fileData = response.data;
          const sampleObject = fileData.data.data;
          const details = {
            uploaded_by_username: fileData.data.uploaded_by_username,
            category_name: fileData.data.category_name,
            module_name: fileData.data.module_name,
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
            align: 'center',
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
        newData.splice(index, 1, {
          ...item,
          ...values, // Update with validated form values
        });
        setDataSource(newData);
        setEditingKey("");
      } else {
        newData.push(values); // Push validated form values
        setDataSource(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDownload = (downloadType) => {
    const requestData = {
      export_type: downloadType,
      file_id: id, // Assuming 'id' is a variable in your component
    };

    const contentType = downloadType === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    api("POST", "/data/export_file/", requestData, contentType, "blob")
      .then((response) => {
        const extension = downloadType === 'csv' ? 'csv' : 'xlsx';
        // Check if response.headers is available
        // Create a Blob from the response data
        let blob;

        if (extension === 'csv') {
          blob = new Blob([response], { type: 'text/csv' });
        } else {
          blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          // blob = new Blob([response], { type: 'text/csv' });
        }

        // Create a link element and trigger the download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `exported_data.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log("File downloaded successfully:", response);
      })
      .catch((error) => {
        console.error("File download error:", error);
      })
      .finally(() => {
        setDownloadModalVisible(false);
      });
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

  const detailsContent = (
    <Descriptions>
        <Descriptions.Item label="Uploaded By">
        {fileDetails.uploaded_by_username}
      </Descriptions.Item>
      <Descriptions.Item label="Category Name">
        {fileDetails.category_name}
      </Descriptions.Item>
      <Descriptions.Item label="Module Name">
        {fileDetails.module_name}
      </Descriptions.Item>
    
      <Descriptions.Item label="Uploaded At">
        {new Date(fileDetails.uploaded_at).toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Descriptions.Item>
      <Descriptions.Item label="Modified At">
        {new Date(fileDetails.modified_at).toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Descriptions.Item>
    </Descriptions>
  );

  return (
    <>
    

      <div style={{ marginBottom: 16, display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
  <Switch
    checked={showFileDetails}
    onChange={setShowFileDetails}
    style={{width: "10px", marginRight: 8 }}
  />
  <span>Show File Details</span>
</div>
  
      {showFileDetails && detailsContent}
  
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "flex-start" }}>
        <Button
          type="primary"
          size="large"
          style={{ width: "200px", marginLeft: 16 }}
          onClick={() => setDownloadModalVisible(true)}
        >
          Download
        </Button>
      </div>
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
          columns={[operationColumn, idxCols, ...mergedColumns]}
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
      <DownloadModal
        visible={downloadModalVisible}
        onCancel={() => setDownloadModalVisible(false)}
        onDownload={handleDownload}
      />
    </>
  );
};

export default DynamicEditableTable;
