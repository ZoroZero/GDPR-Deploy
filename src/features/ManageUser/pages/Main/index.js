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
import { useSelector, useDispatch } from "react-redux";
import { getStore } from "store";
import {
  setSearchKey,
  setPageNo,
  setPageSize,
  setSortBy,
  setSortOrder,
} from "../../slice";

MainPage.propTypes = {};
const { confirm } = Modal;
const { Search } = Input;
// const dispatch = useDispatch();

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
    sorter: true,
  },
  {
    title: "FirstName",
    dataIndex: "FirstName",
    sorter: true,
    // sorter: true,
    // render: (name) => `${FirstName} ${LastName}`,
    // width: "20%",
  },
  {
    title: "LastName",
    dataIndex: "LastName",
    sorter: true,
    // sorter: true,
    // render: (name) => `${FirstName} ${LastName}`,
    // width: "20%",
  },
  {
    title: "Email",
    dataIndex: "Email",
    sorter: true,
  },
  {
    title: "Username",
    dataIndex: "UserName",
    sorter: true,
  },
  {
    title: "Role",
    dataIndex: "RoleName",
    filters: [
      { text: "admin", value: "admin" },
      { text: "normal-user", value: "normal-user" },
      { text: "dc-member", value: "dc-member" },
      { text: "contact-point", value: "contact-point" },
    ],
  },
  {
    title: "IsActive",
    dataIndex: "IsActive",
    key: "IsActive",
    filters: [
      { text: "Active", value: "Active" },
      { text: "InActive", value: "InActive" },
    ],
    // render: (IsActive) => (
    //   <>
    //     ''+IsActive
    //     {/* {tags.map((tag) => {
    //       let color = tag.length > 5 ? "geekblue" : "green";
    //       if (tag === "loser") {
    //         color = "volcano";
    //       }
    //       return (
    //         <Tag color={color} key={tag}>
    //           {tag.toUpperCase()}
    //         </Tag>
    //       );
    //     })} */}
    //   </>
    // ),
  },
  {
    title: "UpdatedDate",
    dataIndex: "UpdatedDate",
    sorter: true,
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
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const [pagination, setPagination] = useState({ PageNo: 1, PageSize: 7 });
  const [loading, setLoading] = useState(false);
  const {
    startDate,
    SearchKey,
    PageNo,
    PageSize,
    SortBy,
    SortOrder,
  } = useSelector((state) => state.userManagement);
  useEffect(() => {
    // dispatch(setSearchKey({ searchKey: "afhkahsgjk" }));
    fetch({ PageNo: PageNo, PageSize: PageSize, SearchKey: SearchKey });
    // fetch();
  }, []);
  function onChange(pageNumber) {
    console.log("Page: ", pageNumber);
    // dispatch(setSearchKey({ searchKey: "a" }));
    dispatch(setPageNo({ PageNo: pageNumber }));
    fetch({
      PageNo: PageNo,
      PageSize: PageSize,
      SearchKey: SearchKey,
      SortBy: SortBy,
      SortOrder: SortOrder,
    });
    // setPagination({PageNo: pageNumber, PageSize: {paginaion}});
    // console.log(getPageParams({ PageNo: pageNumber, PageSize: 7 }));
  }
  function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
    // setTotal(pageSize);
    dispatch(setPageSize({ PageSize: pageSize }));
    fetch({ PageNo: PageNo, PageSize: PageSize, SearchKey: SearchKey });
  }
  function showTotal(total) {
    return `Total ${total} items`;
  }
  function search(SearchKey) {
    dispatch(setSearchKey({ SearchKey: SearchKey }));
    dispatch(setPageNo({ PageNo: 1 }));
    fetch({
      PageNo: PageNo,
      PageSize: PageSize,
      SearchKey: SearchKey,
      SortBy: SortBy,
      SortOrder: SortOrder,
    });
  }
  function handleTableChange(pagination, filters, sorter) {
    console.log("Various parameters", pagination, filters, sorter);
    console.log("Filter", filters);
    console.log("Sorter", sorter);
    console.log(sorter.length != 0);
    if (sorter.length != 0) {
      dispatch(setSortBy({ SortBy: sorter.field }));
      console.log(sorter.field);
      dispatch(setSortOrder({ SortOrder: sorter.order }));
      console.log("Order", SortOrder);
      console.log("By", sorter.field);
      fetch({
        PageNo: PageNo,
        PageSize: PageSize,
        SearchKey: SearchKey,
        SortBy: sorter.field,
        SortOrder: sorter.order,
      });
    }
  }
  // function onChange() {
  //   console.log();
  // }
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
      console.log("res", res.length);
      if (res.length != 0) setTotal(res[0].TotalItem);
      else setTotal(0);
      showTotal({ total });
      // res.map()
      // console.log(res);
      // console.log(res[0].TotalItem);
      // setPagination({
      //   current: 2, pageSize: 5,
      //   total: res[0].TotalPage*5,
      // });
      setPagination({
        ...params.pagination,
        // total: res[0].TotalPage * 5,
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
            onSearch={(value) => search(value)}
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
        // onChange={onChangeTable}
        // onChange={handleTableChange}
      />
      <br />
      <Row>
        <Col span={12} offset={6}>
          <Pagination
            showQuickJumper
            // showSizeChanger
            // onShowSizeChange={onShowSizeChange}
            defaultCurrent={1}
            total={total}
            showTotal={showTotal}
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
