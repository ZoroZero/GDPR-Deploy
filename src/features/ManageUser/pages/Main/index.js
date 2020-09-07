import React, { useEffect, useState } from "react";
import { Modal, Table, Space, Button, Input, Row, Col } from "antd";
import { ExclamationCircleOutlined, AudioOutlined } from "@ant-design/icons";
import "./index.scss";
import CreateUserModal from "../../../../components/ManageUser/CreateUserModal.js";
import UpdateUserModal from "../../../../components/ManageUser/UpdateUserModal.js";
import { getUsersApi } from "api/user";
import { useSelector } from "react-redux";

MainPage.propTypes = {};
const { confirm } = Modal;
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
    onCancel() {},
  });
}
const getRandomuserParams = (params) => {
  return {
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ...params,
  };
};

const columns = [
  {
    title: "Id",
    dataIndex: "Id",
  },
  {
    title: "FirstName",
    dataIndex: "FirstName",
    // sorter: true,
    // render: (name) => `${FirstName} ${LastName}`,
    // width: "20%",
  },
  {
    title: "LastName",
    dataIndex: "LastName",
    // sorter: true,
    // render: (name) => `${FirstName} ${LastName}`,
    // width: "20%",
  },
  {
    title: "Email",
    dataIndex: "Email",
  },
  {
    title: "Username",
    dataIndex: "UserName",
  },
  {
    title: "Role",
    dataIndex: "RoleName",
  },
  {
    title: "IsActive",
    dataIndex: "IsActive",
  },
  {
    title: "UpdatedDate",
    dataIndex: "UpdatedDate",
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
];

function MainPage() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
  const [loading, setLoading] = useState(false);
  const { startDate } = useSelector((state) => state.userManagement);
  useEffect(() => {
    fetch({ pagination });
  }, []);

  const handleTableChange = (tablePagination, filters, sorter) => {
    fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination: tablePagination,
      ...filters,
    });
  };

  const fetch = (params = {}) => {
    setLoading(true);
    return getUsersApi(getRandomuserParams(params)).then((res) => {
      setLoading(false);
      // setData(res.results);
      setData(res);
      // res.map()
      console.log(res);
      console.log(res[0].TotalPage);
      // setPagination({
      //   current: 2, pageSize: 5,
      //   total: res[0].TotalPage*5,
      // });
      setPagination({
        ...params.pagination,
        total: res[0].TotalPage * 5,
      });
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
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default MainPage;
