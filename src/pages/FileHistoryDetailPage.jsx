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
import { useNavigate, useParams } from "react-router-dom";
import api from "../apiConfig";
import "../App.css";
import FileAPI from "../api/FileComponentApis/FileAPI";
import { toast } from "react-toastify";

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
            open={visible}
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

const FileHistoryDetailPage = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [columns, setColumns] = useState([]);
    const [fileDetails, setFileDetails] = useState({});
    const [idxCols, setIdxCols] = useState([]);
    const [downloadModalVisible, setDownloadModalVisible] = useState(false);
    const [showFileDetails, setShowFileDetails] = useState(false);

    useEffect(() => {
        const getHistoryFileData = () => {
            try {
                api("GET", `/data/get_history_file_data/?file_id=${id}`).then((response) => {
                    const fileData = response.data;
                    const sampleObject = fileData.data.data;
                    const details = {
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
                }).catch((error) => {
                    toast.error(error)
                })
            } catch (error) {
                toast.error(error)
            }
        }

        getHistoryFileData();
    }, []);

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
            }),
        };
    });

    const updatedMergedColumns = [idxCols, ...mergedColumns];

    const detailsContent = (
        <Descriptions>
          <Descriptions.Item label="Uploaded By">
            {fileDetails.uploaded_by_username}
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
              style={{ width: "10px", marginRight: 8 }}
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
                    columns={updatedMergedColumns}
                    rowClassName="editable-row"
                    pagination={false}
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

export default FileHistoryDetailPage;
