import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  Table,
  Space,
  Button,
  Input,
  Row,
  Col,
  Tag,
  Pagination,
} from "antd";
import { ExclamationCircleOutlined, AudioOutlined } from "@ant-design/icons";
import "./index.scss";
import AddCustomerModal from "../../../../components/ManageCustomer/AddCustomerModal";
import EditCustomerModal from "../../../../components/ManageCustomer/EditCustomerModal";
import { deleteCustomerApi } from "api/customer";
import {
  setData,
  setPagination,
  setSort,
  setSearch,
  setRefresh,
  getCustomerList,
  setLoading,
} from "features/ManageCustomer/slice";
import { useDispatch, useSelector } from "react-redux";

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
    refresh,
    loading,
  } = useSelector((state) => state.customerManagement);

  const [modalCreateVisible, setModalCreateVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
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
  const searchBox = useRef(null);
  const pageOptions = [10, 20, 50, 100];

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "FirstName",
      sorter: true,
      render: (text, record) => (
        <p>
          {" "}
          {text} {record.LastName}
        </p>
      ),
    },
    {
      title: "Contact Point",
      dataIndex: "ContactPointEmail",
      sorter: true,
      filters: [
        {
          text: "Assigned",
          value: true,
        },
        {
          text: "Null",
          value: false,
        },
      ],
      onFilter: (value, record) =>
        value
          ? record.ContactPointEmail !== null
          : record.ContactPointEmail == null,
    },
    {
      title: "Contract Begin",
      dataIndex: "ContractBeginDate",
      sorter: true,
    },
    {
      title: "Contract End",
      dataIndex: "ContractEndDate",
      sorter: true,
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
          value: true,
        },
        {
          text: "Inactive",
          value: false,
        },
      ],
      onFilter: (value, record) => record.IsActive == value,
      render: (val) =>
        val ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setDataEdit(record);
              setModalEditVisible(true);
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
          {/* <a className="ant-dropdown-link">
          More actions <DownOutlined />
        </a> */}
        </Space>
      ),
    },
    {
      title: "Machines Owner",
      dataIndex: "servers",
      sorter: true,
      render: (text) => <Tag color="cyan"> Manage {text ? text : 0} </Tag>,
    },
  ];

  useEffect(() => {
    fetch(
      pagination.current,
      pagination.pageSize,
      sortColumn,
      sortOrder,
      keyword
    );
  }, [refresh, sortColumn, sortOrder]);

  async function fetch(current, pageSize, sortColumn, sortOrder, keyword) {
    console.log("FETCH DATA INDEX");
    dispatch(setLoading(true));
    await dispatch(
      getCustomerList({
        current: current,
        pageSize: pageSize,
        sortColumn: sortColumn,
        sortOrder: sortOrder,
        keyword: keyword,
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

  async function handleSearchChange(newKeyword) {
    searchBox.current.state.value = "";
    (await newKeyword)
      ? dispatch(setSearch(newKeyword))
      : dispatch(setSearch(""));
    await dispatch(setPagination({ ...pagination, current: 1 }));
    await dispatch(setRefresh(!refresh));
    dispatch(setSearch(""));
  }

  function handleSortChange(pagination, filters, sorter) {
    var newSortColumn = sorter.column ? sorter.column.dataIndex : "CreatedDate";
    var newSortOrder = sorter.order === "descend" ? "descend" : "ascend";
    dispatch(setSort({ sortColumn: newSortColumn, sortOrder: newSortOrder }));
    fetch(
      pagination.current,
      pagination.pageSize,
      newSortColumn,
      newSortOrder,
      keyword
    );
  }

  function handlePageChange(pageNumber, pageSize) {
    console.log("handle page change", pageNumber, pageSize);
    // dispatch(
    //   setPagination({
    //     total: pagination.total,
    //     pageSize: pagination.pageSize,
    //     current: pageNumber,
    //   })
    // );
    fetch(pageNumber, pageSize, sortColumn, sortOrder, keyword);
  }
  function showTotal(total) {
    return `${data.length} of ${total} items`;
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      console.log("selectedRowKeys changed: ", newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };
  const hasSelected = selectedRowKeys.length > 0;

  const start = () => {
    console.log(selectedRowKeys);
  };

  return (
    <div>
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
          >
            {" "}
          </AddCustomerModal>

          <EditCustomerModal
            record={dataEdit}
            modalVisible={modalEditVisible}
            setModalVisible={setModalEditVisible}
          ></EditCustomerModal>
        </Col>
        <Col span={8} offset={8}>
          <Search
            className="search-bar"
            name="search-content"
            placeholder="input search text"
            enterButton="Search"
            size="large"
            onSearch={(value) => {
              handleSearchChange(value);
            }}
            ref={searchBox}
            autoFocus
          />
        </Col>
      </Row>
      <Button type="primary" onClick={start} disabled={!hasSelected}>
        Action
      </Button>
      <br />
      <br />
      <Table
        columns={columns}
        rowKey={(record) => record.Id}
        dataSource={data}
        loading={loading}
        pagination={false}
        onChange={handleSortChange}
        rowSelection={rowSelection}
        // checkbox
      />
      <br />
      <Row>
        <Col span={12} offset={6}>
          <Pagination
            pageSizeOptions={pageOptions}
            showTotal={(total) => showTotal(total)}
            showSizeChanger={true}
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
    </div>
  );
}

export default MainPage;
/*TODO:
- manage server
- upload file
- check multi customer
- log / detail

*/
