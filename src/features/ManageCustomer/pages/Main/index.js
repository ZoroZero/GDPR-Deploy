import React, { useEffect, useState } from "react";
import {
  Modal,
  Table,
  Space,
  Button,
  Input,
  Row,
  Col,
  Pagination,
  Tag,
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
function onChange(pageNumber) {
  console.log("Page: ", pageNumber);
}
function showTotal(total) {
  return `Total ${total} items`;
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
const getRandomuserParams = (params) => {
  return {
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ...params,
  };
};

const columns = [
  {
    title: "Customer Name",
    dataIndex: "FirstName",
    render: (text, record) => (
      <p> {text} {record.LastName} </p>
    )
  },
  // {
  //   title: "Contact Point",
  //   dataIndex: "ContactPointEmail",
  //   render: (text) => (
  //     <p> {text} </p>
  //   )
  //   // sorter: true,
  //   // render: (name) => `${FirstName} ${LastName}`,
  //   // width: "20%",
  // },
  {
    title: "Contract Begin",
    dataIndex: "ContractBeginDate",
    // sorter: true,

    render: (text) => (
      <p> {text} </p>
    )
    // render: (name) => `${FirstName} ${LastName}`,
    // width: "20%",
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
    // render: (IsActive) => (
    render: (text) => (
      <p> saov {text} </p>
    )
    //   <>
    //     {tags.map((tag) => {
    //       let color = tag.length > 5 ? "geekblue" : "green";
    //       if (tag === "loser") {
    //         color = "volcano";
    //       }
    //       return (
    //         <Tag color={color} key={tag}>
    //           {tag.toUpperCase()}
    //         </Tag>
    //       );
    //     })}
    //   </>
    // ),
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
  const { startDate } = useSelector((state) => state.customerManagement);
  useEffect(() => {
    fetch({ pagination });
    // fetch();
  }, []);

  // const handleTableChange = (tablePagination, filters, sorter) => {
  //   fetch({
  //     sortField: sorter.field,
  //     sortOrder: sorter.order,
  //     pagination: tablePagination,
  //     ...filters,
  //   });
  // };

  const fetch = (params = {}) => {
    setLoading(true);
    return getCustomerApi(getRandomuserParams(params)).then((res) => {
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
      // onChange={handleTableChange}
      />
      <br />
      <Row>
        <Col span={12} offset={6}>
          <Pagination
            showQuickJumper
            defaultCurrent={2}
            total={500}
            onChange={onChange}
          />
        </Col>
      </Row>

      <br />
    </div>
  );
}

export default MainPage;
