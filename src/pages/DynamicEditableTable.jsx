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
  Select,
  Row,
  Col,
  DatePicker,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import api from "../apiConfig";
import "../App.css";
import FileAPI from "../api/FileComponentApis/FileAPI";
import { toast } from "react-toastify";
import CustomLoader from "../components/CustomLoader";
import { FilterOutlined } from '@ant-design/icons';
import moment from 'moment';

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
      <Radio.Group
        onChange={(e) => setDownloadType(e.target.value)}
        value={downloadType}
      >
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
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [showFileDetails, setShowFileDetails] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState('value');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [filterValueFrom, setFilterValueFrom] = useState('');
  const [filterValueTo, setFilterValueTo] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [filterColumns, setFilterColumns] = useState([]);

  const isEditing = (record) => record.key === editingKey;

  const handleFilterButtonClick = () => {
    setFilterModalVisible(true);
  };

  const handleClearFilterClick = async () => {
    try {
      const response = await api("GET", `/data/get_file_data/?id=${id}`);

      if (response && response.data.data.data) {
        const fileData = response.data;
        const sampleObject = fileData.data.data;

        // Extract column names excluding "id"
        const columnNames = Object.keys(sampleObject[1])

        // Set columns for the table
        const newColumns = columnNames.map((key) => ({
          title: key,
          dataIndex: key,
          key: key,
          width: 150,
          editable: true,
          align: 'center',
        }));

        setColumns(newColumns);

        // Set dataSource for the table
        const dataSource = Object.entries(sampleObject).map(([key, item]) => ({
          ...item,
          key,
          index: key,
        }));

        setDataSource(dataSource);

        // Reset filter values in the state
        setFilterType('value');
        setSelectedColumn('');
        setFilterValueFrom('');
        setFilterValueTo('');
        setFilterValue('');

      } else {
        toast.error("Empty or invalid response data");
      }
    } catch (error) {
      toast.error("GET Request Error:", error);
    }
  };


  // Function to handle filter modal Ok button click
  const handleFilterModalOk = () => {
    let filter_value = "";
    // Set the filter_value based on the filter type
    if (filterType === 'date' || filterType === 'range') {
      filter_value = `${filterValueFrom}-${filterValueTo}`;
    } else {
      filter_value = filterValue;
    }

    try {
      // Make the API call to filter_by_column
      api("GET", `/data/filter_by_column/?id=${id}&column_name=${selectedColumn}&filter_type=${filterType}&filter_value=${filter_value}`).then((response) => {
        const fileData = response.data.filtered_data;

        // Extract column names excluding "id"
        const columnNames = Object.keys(fileData[Object.keys(fileData)[0]]);

        // Set columns for the table
        const newColumns = columnNames.map((key) => ({
          title: key,
          dataIndex: key,
          key: key,
          width: 150,
          editable: true,
          align: 'center',
        }));

        setColumns(newColumns);

        // Set dataSource for the table
        const dataSource = Object.entries(fileData).map(([key, item]) => ({
          ...item,
          key,
          index: key,
        }));

        setDataSource(dataSource);
      }).catch((error) => {
        console.log(error);
        console.error("Error in filtering data");
      });
    } catch (error) {
      // Handle API call error
      console.error("API call error:", error);
    }
    setFilterModalVisible(false);
  };

  // Function to handle filter modal Cancel button click
  const handleFilterModalCancel = () => {
    setFilterModalVisible(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const getFileData = async () => {
      try {
        const response = await api("GET", `/data/get_file_data/?id=${id}`);

        if (response && response.data.data.data) {
          const fileData = response.data;
          const sampleObject = fileData.data.data;
          setSelectedFileName(response.data.data.title)
          // Extract column names excluding "id"
          const columnNames = Object.keys(sampleObject[1]).filter((col) => col !== "id");

          // Set columns for the filter modal dropdown
          setFilterColumns(columnNames);
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
          toast.error("Empty or invalid response data");
        }
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
        } else if (
          error.response.status === 400 ||
          error.response.status === 404 ||
          error.response.status === 401
        ) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Something went wrong.");
        }
      }
    };

    getFileData();
    setIsLoading(false);
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
    setIsLoading(true);
    try {
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

        // Call the updateFileData API here
        const fileId = id; // Assuming fileId is a property in your item object
        const rowNum = item.key; // Assuming rowNum is a property in your item object

        try {
          const result = await FileAPI.updateFileData(
            fileId,
            rowNum,
            JSON.stringify(values)
          );
          if (result.success) {
            toast.success(result.response.data.message);
          }
        } catch (error) {
          toast.error(error.error);
          if (error.isLogout) {
            localStorage.removeItem("accessToken");
            navigate("/login/");
          }
        }
      } else {
        newData.push(values); // Push validated form values
        setDataSource(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      toast.error("Something went wrong while updating data.");
      console.log("Validate Failed:", errInfo);
    }
    setIsLoading(false);
  };

  const handleDownload = (downloadType) => {
    setIsLoading(true);
    const requestData = {
      export_type: downloadType,
      file_id: id, // Assuming 'id' is a variable in your component
    };

    const contentType =
      downloadType === "csv"
        ? "text/csv"
        : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    api("POST", "/data/export_file/", requestData, contentType, "blob")
      .then((response) => {
        const extension = downloadType === "csv" ? "csv" : "xlsx";
        // Check if response.headers is available
        // Create a Blob from the response data
        let blob;

        if (extension === "csv") {
          blob = new Blob([response], { type: "text/csv" });
        } else {
          blob = new Blob([response], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          // blob = new Blob([response], { type: 'text/csv' });
        }

        // Create a link element and trigger the download
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `exported_data.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
        } else if (
          error.response.status === 401 ||
          error.response.status === 415
        ) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Something went wrong.");
        }
      })
      .finally(() => {
        setDownloadModalVisible(false);
      });
    setIsLoading(false);
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
        {new Date(fileDetails.uploaded_at).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Descriptions.Item>
      <Descriptions.Item label="Modified At">
        {new Date(fileDetails.modified_at).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Descriptions.Item>
    </Descriptions>
  );

  return (
    <>
      {isLoading ? (
        <div className="centered-loader">
          <CustomLoader />
        </div>
      ) : null}
      < div style={{ marginBottom: 16, display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
        <Switch
          checked={showFileDetails}
          onChange={setShowFileDetails}
          style={{ width: "10px", marginRight: 8 }}
        />
        <span>Show File Details</span>
      </div >

      {showFileDetails && detailsContent
      }

      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
        <Button
          type="primary"
          size="large"
          style={{ width: "200px", marginLeft: 16 }}
          onClick={() => setDownloadModalVisible(true)}
        >
          Download
        </Button>
        <div style={{ display: "flex" }}>
          <Button type="default" size="large" icon={<FilterOutlined />} onClick={handleFilterButtonClick} style={{ width: "150px", marginRight: "20px" }} >
            Filter
          </Button>
          <Button type="primary" size="large" style={{ width: "100px" }} onClick={handleClearFilterClick}>Clear</Button>
        </div>
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
          columns={[operationColumn, ...mergedColumns]}
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

      <Modal
        title="Filter Settings"
        open={filterModalVisible}
        onOk={handleFilterModalOk}
        onCancel={handleFilterModalCancel}
      >
        <Form>
          <Form.Item label="File Name">
            <Input type="text" value={selectedFileName} disabled />
          </Form.Item>
          <Form.Item label="Filter Type">
            <Radio.Group onChange={(e) => setFilterType(e.target.value)} value={filterType}>
              <Row gutter={8}>
                <Col span={10}>
                  <Radio value="value">Value</Radio>
                </Col>
                <Col span={8}>
                  <Radio value="range">Range</Radio>
                </Col>
                {/* <Col span={8}>
                  <Radio value="date">Date</Radio>
                </Col> */}
              </Row>
            </Radio.Group>
          </Form.Item>


          <Form.Item label="Column Name">
            <Select
              style={{ width: '100%' }}
              onChange={(value) => setSelectedColumn(value)}
              value={selectedColumn}
              placeholder="Select a column"
            >
              {filterColumns.map((column) => (
                <Select.Option key={column} value={column}>
                  {column}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {filterType === 'range' && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Form.Item label="Min">
                  <Input
                    type="text"
                    value={filterValueFrom}
                    onChange={(e) => setFilterValueFrom(e.target.value)}
                    placeholder="Min"
                    style={{ width: "150px" }}
                  />
                </Form.Item>
                <Form.Item label="Max">
                  <Input
                    type="text"
                    value={filterValueTo}
                    onChange={(e) => setFilterValueTo(e.target.value)}
                    placeholder="Max"
                    style={{ width: "150px" }}
                  />
                </Form.Item>
              </div>
            </>
          )}

          {filterType === 'date' && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Form.Item label="Date Range">
                  <DatePicker.RangePicker
                    style={{ width: "100%" }}
                    value={[
                      filterValueFrom ? moment(filterValueFrom, 'YYYY-MM-DD') : null,
                      filterValueTo ? moment(filterValueTo, 'YYYY-MM-DD') : null,
                    ]}
                    onChange={(dates, dateStrings) => {
                      setFilterValueFrom(dateStrings[0]);
                      setFilterValueTo(dateStrings[1]);
                    }}
                    format="YYYY-MM-DD"
                    placeholder={['From Date', 'To Date']}
                  />
                </Form.Item>
              </div>
            </>
          )}

          {filterType === 'value' && (
            <Form.Item label="Value">
              <Input
                type="text"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                placeholder="Enter value"
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default DynamicEditableTable;
