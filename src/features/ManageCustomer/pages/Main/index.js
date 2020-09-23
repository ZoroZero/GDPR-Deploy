import React, { useEffect, useRef, useState } from "react";
/*TODO: 
- improve performance
*/
import {
  Modal,
  Table,
  Space,
  Button,
  Input,
  Row,
  Col,
  Tag,
  Tooltip,
  Pagination,
  Menu,
  Dropdown,
} from "antd";
import {
  ExclamationCircleOutlined,
  WarningTwoTone,
  DownOutlined,
} from "@ant-design/icons";
import "./index.scss";
import AddCustomerModal from "../../../../components/ManageCustomer/AddCustomerModal";
import EditCustomerModal from "../../../../components/ManageCustomer/EditCustomerModal";
import ManageServerModal from "../../../../components/ManageCustomer/ManageServerModal";
import {
  deleteCustomerApi,
  deleteCustomersApi,
  deactiveCustomersApi,
  activeCustomersApi,
} from "api/customer";
import {
  setPagination,
  setFilter,
  setSort,
  getOtherServers,
  setSearch,
  setRefresh,
  getCustomerList,
  setLoading,
} from "features/ManageCustomer/slice";
import { useDispatch, useSelector } from "react-redux";
import ExportCustomerModal from "components/ManageCustomer/ExportCustomerModal";
import ImportCustomerModal from "components/ManageCustomer/ImportCustomerModal";
MainPage.propTypes = {};
const { confirm } = Modal;
const { Search } = Input;

function MainPage() {
  const dispatch = useDispatch();
  const {
    data,
    pagination,
    sortColumn,
    sortOrder,
    keyword,
    filterValue,
    refresh,
    loading,
  } = useSelector((state) => state.customerManagement);

  const [modalCreateVisible, setModalCreateVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalManageVisible, setModalManageVisible] = useState(false);
  const [dataEdit, setDataEdit] = useState({
    FirstName: "",
    LastName: "",
    ContactPointId: null,
    ContactPointEmail: null,
    ContractBeginDate: null,
    ContractEndDate: null,
    Description: "",
    IsActive: true,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataManage, setDataManage] = useState({ Id: "" });
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const searchBox = useRef(null);
  const pageOptions = [10, 20, 50, 100];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="delete">delete</Menu.Item>
      <Menu.Item key="active">active</Menu.Item>
      <Menu.Item key="deactive">deactive</Menu.Item>
    </Menu>
  );

  const hasSelected = selectedRowKeys.length > 0;

  useEffect(() => {
    fetch(
      pagination.current > 0 ? pagination.current : 1,
      pagination.pageSize,
      sortColumn,
      sortOrder,
      keyword,
      filterValue
    );
  }, [refresh, sortColumn, sortOrder, filterValue]);

  async function fetch(
    current,
    pageSize,
    sortColumn,
    sortOrder,
    keyword,
    filterValue
  ) {
    dispatch(setLoading(true));
    await dispatch(
      getCustomerList({
        current: current,
        pageSize: pageSize,
        sortColumn: sortColumn,
        sortOrder: sortOrder,
        keyword: keyword,
        filterValue: filterValue,
      })
    );
    dispatch(setLoading(false));
  }

  function showPromiseConfirm(id) {
    confirm({
      title: "Do you want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      content:
        "When clicked the OK button, this dialog will be closed after 1 second",
      onOk() {
        deleteCustomerApi({ Id: id });
        dispatch(setRefresh(!refresh));
      },
      onCancel() {},
    });
  }

  async function handleMenuClick(value) {
    if (value.key == "delete") {
      await deleteCustomersApi({ deletedCustomers: selectedRowKeys });
      dispatch(setRefresh(!refresh));
      setSelectedRowKeys([]);
    }
    if (value.key == "deactive") {
      await deactiveCustomersApi({ deactivedCustomers: selectedRowKeys });
      dispatch(setRefresh(!refresh));
      setSelectedRowKeys([]);
    } else {
      await activeCustomersApi({ activedCustomers: selectedRowKeys });
      dispatch(setRefresh(!refresh));
      setSelectedRowKeys([]);
    }
  }

  async function handleSearchChange(newKeyword) {
    newKeyword = String(newKeyword).trim();
    (await newKeyword)
      ? dispatch(setSearch(newKeyword))
      : dispatch(setSearch(""));
    setSelectedRowKeys([]);
    await dispatch(setPagination({ ...pagination, current: 1 }));

    dispatch(setRefresh(!refresh));
  }

  async function handleSortChange(pag, filters, sorter) {
    if (filters.IsActive != filterValue) {
      await dispatch(setPagination({ ...pagination, current: 1 }));
      dispatch(setFilter(filters.IsActive));
      setSelectedRowKeys([]);
    }
    if (sorter) {
      var newSortColumn = sorter.column
        ? sorter.column.dataIndex
        : "CreatedDate";
      var newSortOrder = sorter.order === "ascend" ? "ascend" : "descend";
      dispatch(setSort({ sortColumn: newSortColumn, sortOrder: newSortOrder }));
    }
  }

  function handlePageChange(pageNumber, pageSize) {
    fetch(pageNumber, pageSize, sortColumn, sortOrder, keyword, filterValue);
  }

  function showTotal(total) {
    return `${data.length} of ${total} items`;
  }
  const columns = [
    {
      title: "Customer Name",
      dataIndex: "FirstName",
      sorter: true,
      defaultSortOrder: sortColumn == "FirstName" ? sortOrder : null,
      render: (text, record) => (
        <p>
          {text} {record.LastName}
        </p>
      ),
    },
    {
      title: "Contact Point",
      dataIndex: "ContactPointEmail",
      sorter: true,
      defaultSortOrder: sortColumn == "ContactPointEmail" ? sortOrder : null,

      render: (value, record) =>
        record.ContactPointId ? (
          !record.ContactPointStatus ? (
            <>
              <p> {value} </p>{" "}
              <Tooltip title="Contact Point is inactive!">
                <WarningTwoTone twoToneColor="orange" />
              </Tooltip>{" "}
            </>
          ) : (
            <p> {value} </p>
          )
        ) : (
          <></>
        ),
    },
    {
      title: "Contract Begin",
      dataIndex: "ContractBeginDate",
      sorter: true,
      defaultSortOrder: sortColumn == "ContractBeginDate" ? sortOrder : null,
    },
    {
      title: "Contract End",
      dataIndex: "ContractEndDate",
      sorter: true,
      defaultSortOrder: sortColumn == "ContractEndDate" ? sortOrder : null,
    },
    {
      title: "Description",
      dataIndex: "Description",
    },
    {
      title: "Status",
      dataIndex: "IsActive",
      key: "IsActive",
      filters: [
        {
          text: "Active",
          value: 1,
        },
        {
          text: "Inactive",
          value: 0,
        },
      ],
      defaultFilteredValue: filterValue,
      render: (val) =>
        val ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle" style={{ display: "flex" }}>
          <Button
            className="updateButton"
            type="primary"
            onClick={() => {
              setModalEditVisible(true);
              setDataEdit(record);
            }}
          >
            Update
          </Button>

          <Button
            type="primary"
            danger
            onClick={() => {
              showPromiseConfirm(record.Id);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
    {
      title: "Machines Owner",
      dataIndex: "servers",
      sorter: true,
      defaultSortOrder: sortColumn == "servers" ? sortOrder : null,
      render: (text, record) => (
        <ManageServerModal
          record={record}
          totalServers={text}
        ></ManageServerModal>
      ),
    },
  ];
  return (
    <>
      <Row>
        <Col span={8}>
          <Button
            type="primary"
            onClick={() => {
              setModalCreateVisible(true);
            }}
          >
            Create new Customer
          </Button>
          <AddCustomerModal
            modalVisible={modalCreateVisible}
            setModalVisible={setModalCreateVisible}
          ></AddCustomerModal>
          <EditCustomerModal
            record={dataEdit}
            modalVisible={modalEditVisible}
            setModalVisible={setModalEditVisible}
          ></EditCustomerModal>
        </Col>
        <Col span={8}></Col>
        <Col span={8}>
          <Search
            placeholder="input search text"
            enterButton
            onSearch={(value) => {
              handleSearchChange(value);
            }}
            autoFocus={true}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
        <Col span={8}>
          <Dropdown overlay={menu} type="primary" disabled={!hasSelected}>
            <Button>
              Multi actions <DownOutlined />
            </Button>
          </Dropdown>
          {selectedRowKeys.length > 0 && (
            <div
              style={{ display: "inline-block", padding: "0px 20px 0px 20px" }}
            >
              {" "}
              {selectedRowKeys.length} selected!{" "}
            </div>
          )}
        </Col>
        <Col span={8}></Col>
        <Col
          span={8}
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={() => setImporting((exporting) => !exporting)}>
            Import customer list
          </Button>
          <ImportCustomerModal
            visible={importing}
            setVisible={setImporting}
          ></ImportCustomerModal>
          <Button onClick={() => setExporting((exporting) => !exporting)}>
            Export customer list
          </Button>
          <ExportCustomerModal
            id="export-server"
            className="export-server"
            visible={exporting}
            setVisible={setExporting}
          ></ExportCustomerModal>
        </Col>
      </Row>

      <Table
        columns={columns}
        rowKey={(record) => record.Id}
        dataSource={data}
        loading={loading}
        pagination={false}
        scroll={{ x: 1500 }}
        onChange={handleSortChange}
        // onFilter={handleFilterChange}
        rowSelection={rowSelection}
      />
      <br />
      <Row>
        <Col span={12} offset={6}>
          <Pagination
            pageSizeOptions={pageOptions}
            showTotal={(total) => showTotal(total)}
            showSizeChanger={true}
            disabled={!pagination.total > 0}
            showQuickJumper
            defaultCurrent={1}
            current={pagination.current}
            defaultPageSize={pagination.pageSize}
            total={pagination.total}
            onChange={handlePageChange}
          />
        </Col>
      </Row>
      <br />
    </>
  );
}

export default MainPage;
