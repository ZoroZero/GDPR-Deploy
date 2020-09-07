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
import { getUsersApi } from "api/user";
import { useSelector } from "react-redux";

MainPage.propTypes = {};
const { confirm } = Modal;
const { Search } = Input;
function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize);
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
    onCancel() {},
  });
}
const getRandomuserParams = (params) => {
  return {
    PageSize: params.pagination.pageSize,
    PageNo: params.pagination.current,
    ...params,
  };
};
const getPageParams = (params) => {
  return {
    paginaion: {
      pageSize: params.PageSize,
      current: params.PageNo,
    },
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
    key: "IsActive",
    // render: (IsActive) => (
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
  const [total, setTotal] = useState([]);
  const [pagination, setPagination] = useState({ PageNo: 1, PageSize: 7 });
  const [loading, setLoading] = useState(false);
  const { startDate } = useSelector((state) => state.userManagement);
  useEffect(() => {
    fetch(pagination);
    // fetch();
  }, []);
  function onChange(pageNumber) {
    console.log("Page: ", pageNumber);
    fetch({ PageNo: pageNumber, PageSize: 7 });
    console.log(getPageParams({ PageNo: pageNumber, PageSize: 7 }));
  }
  // const handleTableChange = (tablePagination, filters, sorter) => {
  //   fetch({
  //     sortField: sorter.field,
  //     sortOrder: sorter.order,
  //     pagination: tablePagination,
  //     ...filters,
  //   });
  // };

  const fetch = (params) => {
    console.log("abc");
    setLoading(true);
    return getUsersApi(params).then((res) => {
      setLoading(false);
      // setData(res.results);
      setData(res);
      setTotal(res[0].TotalItem);
      // res.map()
      console.log(res);
      console.log(res[0].TotalItem);
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
        pagination={false}
        loading={loading}
        // onChange={handleTableChange}
      />
      <br />
      <Row>
        <Col span={12} offset={6}>
          <Pagination
            // showQuickJumper
            defaultCurrent={1}
            total={total}
            defaultPageSize={7}
            onChange={onChange}
          />
        </Col>
      </Row>

      <br />
    </div>
  );
}

export default MainPage;
