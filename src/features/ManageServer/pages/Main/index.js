import React, { useEffect, useState } from "react";
import {
  Table,
  Pagination,
  Input,
  Button,
  Modal,
  Tag,
  Menu,
  Dropdown,
  message,
  Row,
  Col,
  Space,
} from "antd";
// import { UploadOutlined } from '@ant-design/icons';
import "./index.scss";
import {
  getServersApi,
  deleteServerApi,
  updateMultipleStatusApi,
  recoverServerApi,
} from "api/server";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "features/ManageServer/slice";
import AddEditServerModal from "components/ManageServer/AddEditServerModal";
import { SERVER_CONSTANTS } from "constants/ManageServer/server";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ExportServer from "components/ManageServer/ExportServer";
import ImportServer from "components/ManageServer/ImportServer";
import { DownOutlined, UploadOutlined } from "@ant-design/icons";

MainPage.propTypes = {};

const { Search } = Input;
const { confirm } = Modal;

function MainPage() {
  const dispatch = useDispatch();
  const { refresh } = useSelector((state) => state.serverManagement);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });
  const [sorter, setSorter] = useState({
    sortColumn: SERVER_CONSTANTS.DEFAULT_SORT_COLUMN,
    sortOrder: SERVER_CONSTANTS.DEFAULT_SORT_ORDER,
  });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filter, setFilter] = useState({
    filterColumn: SERVER_CONSTANTS.DEFAULT_FILTER_COLUMN,
    filterKeys: SERVER_CONSTANTS.DEFAULT_FILTER_KEYS,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [editRequest, setEditRequest] = useState(null);
  // const [checkingRows, setCheckingRows] = useState([])
  const [selectingServerIdList, setSelectingServerIdList] = useState([]);

  useEffect(() => {
    fetch(
      pagination,
      sorter.sortColumn,
      sorter.sortOrder,
      searchKeyword,
      filter
    );
  }, [pagination, sorter, searchKeyword, refresh, filter]);

  useEffect(() => {
    handleModalActivate();
  }, [editRequest]);

  // Table columns
  const columns = [
    {
      title: "Server",
      dataIndex: "Name",
      width: "30%",
      sorter: true,
    },
    {
      title: "Ip address",
      dataIndex: "IpAddress",
      width: "12%",
      sorter: true,
    },
    {
      title: "Start Date",
      dataIndex: "StartDate",
      width: "12%",
      sorter: true,
    },
    {
      title: "End Date",
      dataIndex: "EndDate",
      sorter: true,
      width: "12%",
    },
    {
      title: "Status",
      width: "12%",
      key: "Status",
      render: (record) => {
        if (record.IsDeleted) return <Tag color="gray">Deleted</Tag>;
        return record.IsActive ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">InActive</Tag>
        );
      },
      filters: [
        { text: "Active", value: "1" },
        { text: "InActive", value: "0" },
        { text: "Deleted", value: "deleted" },
      ],
    },
    {
      title: "Owner",
      dataIndex: "OwnerName",
      width: "12%",
      sorter: true,
    },
    {
      title: "Action",
      key: "operation",
      width: "10%",
      render: (record) => (
        <Space size="middle" style={{ display: "flex" }}>
          <Button
            type="primary"
            onClick={() => {
              setEditRequest({
                type: SERVER_CONSTANTS.UPDATE_SERVER_TYPE,
                data: record,
              });
            }}
          >
            Edit
          </Button>
          {record.IsDeleted ? (
            <Button
              danger
              type="primary"
              onClick={() => {
                showRecoverModal(record);
              }}
            >
              Recover
            </Button>
          ) : (
            <Button
              danger
              type="primary"
              onClick={() => {
                showDeleteModal(record);
              }}
            >
              Delete
            </Button>
          )}
        </Space>
      ),
    },
    //   {
    //     title: 'Delete',
    //     key: 'operation',
    //     width: "10%",
    //     render: (record) => ,
    //   }
  ];

  // Handle change in page number
  const handlePageChange = (pageNumber, pageSize) => {
    // //console.log(pageNumber);
    var newPageNum = pageNumber;
    if (
      pageSize !== pagination.pageSize &&
      Math.ceil(total / pageSize) < pagination.pageNumber
    )
      newPageNum = Math.ceil(
        (pagination.pageSize * pagination.page) / pageSize
      );
    setPagination({ page: newPageNum, pageSize: pageSize });
    //console.log("Fetch after pagination change");
    setSelectingServerIdList([]);
  };

  // Fetch data
  const fetch = (pagination, sortColumn, sortOrder, keyword, filter) => {
    // //console.log(filter);
    if (!exporting) {
      setLoading(true);
      return getServersApi({
        current: pagination.page,
        pageSize: pagination.pageSize,
        sortColumn: sortColumn,
        sortOrder: sortOrder,
        keyword: keyword,
        filterColumn: filter.filterColumn,
        filterKeys: filter.filterKeys,
      })
        .then((res) => {
          //console.log("Fetch res", res);
          setLoading(false);
          setTableData(res.data, res.total);
          showTotal(res.total);
        })
        .catch((err) => {
          //console.log(err);
        });
    }
  };

  // Set table data
  const setTableData = (data, total) => {
    //console.log(data);
    setTotal(total);
    setData(data);
  };

  // Handle table change: sort, filter
  const handleTableChange = (pagi, filters, sorter) => {
    //console.log("Filters; ", filters);
    var newSortColumn = sorter.column ? sorter.column.dataIndex : "Name";
    var newSortOrder = sorter.order === "descend" ? "descend" : "ascend";
    // dispatch(setSort({sortColumn: newSortColumn, sortOrder: newSortOrder }));
    setSorter({ sortColumn: newSortColumn, sortOrder: newSortOrder });
    // Filter
    let filterColumn = SERVER_CONSTANTS.DEFAULT_FILTER_COLUMN;
    let filterKeys = SERVER_CONSTANTS.DEFAULT_FILTER_KEYS;
    if (filters.Status) {
      if (filters.Status.includes("deleted")) {
        if (filters.Status.length === 1) {
          filterColumn = "Deleted";
        } else {
          filterColumn = "Status+Deleted";
          filterKeys = filters.Status.filter((x) => x !== "deleted").join(",");
        }
      } else {
        filterColumn = "Status";
        filterKeys = filters.Status.join(",");
      }
    }
    //console.log("New filter column", filterColumn);
    //console.log("New filter keys", filterKeys);
    // var filterKeys = filters.Status? filters.Status.join(): SERVER_CONSTANTS.DEFAULT_FILTER_KEYS
    if (filter.filterKeys !== filterKeys) {
      setPagination({ page: 1, pageSize: pagination.pageSize });
    }
    setFilter({ filterColumn: filterColumn, filterKeys: filterKeys });
    // //console.log("Fetch after sort change");
    setSelectingServerIdList([]);
  };

  //Handle search
  const handleSearchServer = (keyword) => {
    setSearchKeyword(keyword);
    setPagination({ page: 1, pageSize: pagination.pageSize });
    // setCheckingRows([])
    setSelectingServerIdList([]);
    // //console.log("Fetch after search");
  };

  // Handle on edit click
  const handleModalActivate = () => {
    if (editRequest) {
      setModalVisible(true);
    }
  };

  // Show delete modal
  const showDeleteModal = (record) => {
    confirm({
      title: "Do you want to delete server " + record.Name,
      icon: <ExclamationCircleOutlined />,
      content: "Warning: The deletion will affect customers",
      onOk() {
        handleDeleteServer(record.Id);
      },
      onCancel() {},
    });
  };

  // Handle delete server
  const handleDeleteServer = (id) => {
    return deleteServerApi({ id: id })
      .then((res) => {
        //console.log("Delete response", res);
        dispatch(setRefresh(!refresh));
      })
      .catch(() => message.error("Oops errors!"));
  };

  // Show delete modal
  const showRecoverModal = (record) => {
    confirm({
      title: "Do you want to recover server " + record.Name,
      icon: <ExclamationCircleOutlined />,
      content: "Warning: You need to edit start date and end date of server",
      onOk() {
        handleRecoverServer(record.Id);
      },
      onCancel() {},
    });
  };

  // Handle recover server
  const handleRecoverServer = (id) => {
    return recoverServerApi({ id: id })
      .then((res) => {
        //console.log("Recover response", res);
        dispatch(setRefresh(!refresh));
      })
      .catch(() => message.error("Oops errors!"));
  };

  // Handle toggle export
  const toggleExport = () => {
    setExporting((exporting) => !exporting);
  };

  // Toggle import modal
  const toggleImport = () => {
    setImporting((importing) => !importing);
  };

  // Handle row selected
  const rowSelection = {
    selectedRowKeys: selectingServerIdList,
    onChange: (selectedRowKeys, selectedRows) => {
      // //console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
      // setCheckingRows(selectedRows);
      setSelectingServerIdList(selectedRowKeys);
    },
  };

  // Show total record
  const showTotal = (total) => {
    return `Total ${total} items`;
  };

  // Handle set status of checking rows
  const handleSetStatus = (status) => {
    return updateMultipleStatusApi({
      listServer: selectingServerIdList,
      status: status,
    })
      .then((res) => {
        // //console.log("Multiple update", res);
        message.success("Successfully change status of servers");
        dispatch(setRefresh(!refresh));
      })
      .catch((err) => {
        // //console.log("Activate all err", err);
        message.error("Something went wrong");
      });
  };

  // Handle action menu onClick
  const handleMenuClick = (e) => {
    // //console.log(e)
    handleSetStatus(e.key === "activate");
  };

  // Menu of action button
  const actionMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="activate">Activate all</Menu.Item>
      <Menu.Item key="deactivate">Deactivate all</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Row>
        <Col span={8}>
          <Button
            type="primary"
            onClick={() => setEditRequest(SERVER_CONSTANTS.ADD_SERVER_REQUEST)}
          >
            Create new server
          </Button>

          <AddEditServerModal
            request={editRequest}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setEditRequest={setEditRequest}
          ></AddEditServerModal>
        </Col>
        <Col span={8} offset={8}>
          <Search
            className="search-bar"
            placeholder="Input search text"
            enterButton
            onSearch={(value) => handleSearchServer(value.trim())}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
        <Col span={8}>
          <Dropdown
            overlay={actionMenu}
            disabled={selectingServerIdList.length === 0}
          >
            <Button>
              Multi actions <DownOutlined />
            </Button>
          </Dropdown>
          {selectingServerIdList.length > 0 && (
            <div
              style={{ display: "inline-block", padding: "0px 20px 0px 20px" }}
            >
              {" "}
              {selectingServerIdList.length} selected!
            </div>
          )}
        </Col>
        <Col span={8}></Col>
        <Col
          span={8}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={toggleImport}>Import server list</Button>
          <ImportServer
            visible={importing}
            setVisible={setImporting}
          ></ImportServer>

          <Button onClick={toggleExport}>Export server list</Button>
          <ExportServer
            id="export-server"
            className="export-server"
            visible={exporting}
            setVisible={setExporting}
          ></ExportServer>
        </Col>
      </Row>

      <Table
        columns={columns}
        rowKey={(record) => record.Id}
        rowSelection={rowSelection}
        dataSource={data}
        pagination={false}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 1500}}
      />
      <Row>
        <Col span={12} offset={6}>
          <Pagination
            showQuickJumper
            showSizeChanger
            total={total}
            current={pagination.page}
            pageSize={pagination.pageSize}
            onChange={handlePageChange}
            showTotal={showTotal}
            style={{ margin: "8px 8px" }}
            
          />
        </Col>
      </Row>
    </>
  );
}

export default MainPage;
