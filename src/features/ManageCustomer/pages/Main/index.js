import React, { useEffect, useState } from "react";
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
import AddEditCustomerModal from "../../../../components/ManageCustomer/AddEditCustomerModel";
import UpdateUserModal from "../../../../components/ManageUser/UpdateUserModal.js";
import { getCustomerApi } from "api/customer";

import { setSort } from "features/ManageCustomer/slice";
import { useDispatch, useSelector } from "react-redux";

MainPage.propTypes = {};
const { confirm } = Modal;
const pageSize = 10;
const { Search } = Input;

function showPromiseConfirm() {
  confirm({
    title: "Do you want to delete these items?",
    icon: <ExclamationCircleOutlined />,
    content:
      "When clicked the OK button, this dialog will be closed after 1 second",
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log("Oops errors!"));
    },
    onCancel() { },
  });
}

const columns = [
  {
    title: "Customer Name",
    dataIndex: "Name",
    sorter: true,
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
    dataIndex: "Description"
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
    render: () => (
      <Space size="middle">
        {/* <Button type="primary">Update</Button> */}
        <UpdateUserModal />
        <Button type="primary" danger onClick={showPromiseConfirm}>
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

function MainPage() {
  const [contactPoints, setContactPoints] = useState([]);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { sortColumn, sortOrder } = useSelector(
    (state) => state.customerManagement
  );
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState();
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [modalVisible, setModalVisible] = useState(false)
  useEffect(() => {
    getContactPointsApi().then((res) => {
      setContactPoints(res);
      console.loh(res)
    });
    fetch(1, sortColumn, sortOrder, searchKeyword);
  }, [sortColumn, sortOrder, searchKeyword]);

  function handleSearchCustomer(keyword) {
    keyword ? setSearchKeyword(keyword) : setSearchKeyword('');
    fetch(1, sortColumn, sortOrder, keyword);
  }

  async function handleSortChange(pagination, filters, sorter) {
    var newSortColumn = sorter.column ? sorter.column.dataIndex : "CreatedDate";
    var newSortOrder = sorter.order === "descend" ? "descend" : "descend";
    await dispatch(
      setSort({ sortColumn: newSortColumn, sortOrder: newSortOrder })
    );
    fetch(page, newSortColumn, newSortOrder, searchKeyword);
  }
  function onPageChange(pageNumber) {
    setPage(pageNumber);
    fetch(pageNumber, sortColumn, sortOrder, searchKeyword);
  }

  const fetch = (pageNumber, sortColumn, sortOrder, keyword) => {
    setLoading(true);
    getCustomerApi({
      current: pageNumber,
      pageSize: pageSize,
      sortColumn: sortColumn,
      sortOrder: sortOrder,
      keyword: keyword,
    }).then((res) => {
      setLoading(false);
      setData(res);
      console.log(res)
      setTotal(res[0] ? res[0].Total : 0);
    });

  };

  return (
    <div>
      <Row>
        <Col span={8}>

          <Button type="primary" onClick={() => setModalVisible(true)}>
            Create new Customer
            </Button>

          <AddEditCustomerModal modalVisible={modalVisible} setModalVisible={setModalVisible}> </AddEditCustomerModal>

        </Col>
        <Col span={8} offset={8}>
          <Search
            className="search-bar"
            placeholder="input search text"
            enterButton="Search"
            size="large"
            onSearch={(value) => handleSearchCustomer(value)}
          />
        </Col>
      </Row>

      <br />
      <br />
      <Table
        columns={columns}
        rowKey={(record) => record.Id}
        dataSource={data}
        pagination={false}
        loading={loading}
        onChange={handleSortChange}
      />
      <br />
      <Row>
        <Col span={12} offset={6}>
          <Pagination
            showQuickJumper
            defaultCurrent={1}
            defaultPageSize={10}
            total={total}
            onChange={onPageChange}
          />
        </Col>
      </Row>

      <br />
    </div>
  );
}

export default MainPage;
