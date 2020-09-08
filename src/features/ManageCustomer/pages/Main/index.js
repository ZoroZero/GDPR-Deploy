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
import CreateUserModal from "../../../../components/ManageUser/CreateUserModal.js";
import UpdateUserModal from "../../../../components/ManageUser/UpdateUserModal.js";
import { getCustomerApi } from "api/customer";
import { useSelector } from "react-redux";

MainPage.propTypes = {};
const { confirm } = Modal;
const { Search } = Input;
function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize);
}


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
    dataIndex: "FirstName",
    sortDirections: ['ascend', 'descend'],
    key: "Name",
    sorter: true,
    render: (text, record) => (
      <p> {text} {record.LastName} </p>
    )
  },
  {

    title: "Contact Point",
    dataIndex: "ContactPointEmail",

    sortDirections: ['ascend', 'descend'],
    key: "ContactPointEmail",
    filters: [
      {
        text: 'Assigned',
        value: true,
      },
      {
        text: 'Null',
        value: false,
      }
    ],
    onFilter: (value, record) => value ? record.ContactPointEmail !== null : record.ContactPointEmail == null,
    sorter: (a, b, sortOrder) => { return a.ContactPointEmail ? (b.ContactPointEmail ? (a.ContactPointEmail).localeCompare(b.ContactPointEmail) : -1) : 1 },
    render: (text) => (
      <p> {text} </p>
    )
  },
  {
    title: "Contract Begin",
    dataIndex: "ContractBeginDate",
    render: (text) => (
      <p> {text} </p>
    )
  },
  {
    title: "Contract End",
    dataIndex: "ContractEndDate",

    render: (text) => (
      <p> {text} </p>
    )
  },


  {
    title: "Status",
    dataIndex: "IsActive",
    key: "IsActive",
    filters: [
      {
        text: 'Active',
        value: true,
      },
      {
        text: 'Inactive',
        value: false,
      }
    ],
    onFilter: (value, record) => record.IsActive == value,
    render: val => (val ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>)
  },
  {
    title: "Action",
    key: "action",
    // sorter: true,
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
    render: (text) => (
      <Tag color="cyan"> Manage { text ? text : 0} </Tag>
    )

  },
];

function MainPage() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1 });
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState();
  // const [page]
  useEffect(() => {
    fetch({ pagination });
    // fetch();
  }, []);

  const handleTableChange = (tablePagination, filters, sorter) => {
    console.log(sorter.column)
    fetch({
      sortField: sorter.columnKey,
      sortOrder: sorter.order,
      pagination: tablePagination,
      ...filters,
    });
  };
  function onChange(pageNumber) {
    console.log("Page: ", pageNumber);
    setPagination({ current: pageNumber });
    return getCustomerApi({ pageSize: 10, pageNumber }).then((res) => {
      console.log(pageNumber);
      setLoading(false);
      setData(res);
      setTotal(res[0].total)
      console.log(res[0])
      console.log(res);
      console.log(res[0].total);

    });
  }

  const fetch = (params = {}) => {
    setLoading(true);
    return getCustomerApi({ pageSize: 10, pageNumber: pagination.current }).then((res) => {
      setLoading(false);
      // setData(res.results);
      setData(res);
      // res.map()
      setTotal(res[0].total)
      console.log(res[0])
      console.log(res);
      console.log(res[0].total);
      // setPagination({
      //   current: 2, pageSize: 5,
      //   total: res[0].TotalPage*5,
      // });
      // setPagination({
      //   ...params.pagination,
      //   total: res[0].TotalPage * 5,
      // });
    });
  };

  return (
    <div>
      <Row>
        <Col span={8}>
          <CreateUserModal />
        </Col>
        <Col span={8} offset={8}>
          <Search
            placeholder="input search text"
            onSearch={(value) => console.log(value)}
            enterButton
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
        onChange={handleTableChange}
      />
      <br />
      <Row>
        <Col span={12} offset={6}>
          <Pagination
            showQuickJumper
            defaultCurrent={1}
            defaultPageSize={10}
            total={total}
            onChange={onChange}
          />
        </Col>
      </Row>

      <br />
    </div>
  );
}

export default MainPage;
