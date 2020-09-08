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
import { getUsersApi, deleteUsersApi } from "api/user";
import { useSelector, useDispatch } from "react-redux";
import { getStore } from "store";
import {
  setSearchKey,
  setPageNo,
  setPageSize,
  setSortBy,
  setSortOrder,
  setRole,
} from "../../slice";

MainPage.propTypes = {};
const { confirm } = Modal;
const { Search } = Input;
// const dispatch = useDispatch();

// const getRandomuserParams = (params) => {
//   return {
//     PageSize: params.pagination.pageSize,
//     PageNo: params.pagination.current,
//     ...params,
//   };
// };
// const getPageParams = (params) => {
//   return {
//     paginaion: {
//       pageSize: params.PageSize,
//       current: params.PageNo,
//     },
//   };
// };

function MainPage() {
  function showPromiseConfirm(row) {
    confirm({
      title: "Do you want to delete user " + row.UserName,
      icon: <ExclamationCircleOutlined />,
      content: "Warning: The delete user cannot be recover",
      onOk() {
        return new Promise((resolve, reject) => {
          deleteUsersApi(row.Id);
          setTimeout(Math.random() > 0.5 ? resolve : reject, 2000);
          fetch({
            PageNo: PageNo,
            PageSize: PageSize,
            SearchKey: SearchKey,
            SortBy: SortBy,
            SortOrder: SortOrder,
          });
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {},
    });
  }
  const columns = [
    // {
    //   title: "Id",
    //   dataIndex: "Id",
    //   sorter: true,
    // },
    {
      title: "FirstName",
      dataIndex: "FirstName",
      sorter: true,
    },
    {
      title: "LastName",
      dataIndex: "LastName",
      sorter: true,
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
      title: "HashPasswd",
      dataIndex: "HashPasswd",
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
      render: (val) =>
        val ? <Tag color="green">Active</Tag> : <Tag color="red">InActive</Tag>,
    },
    {
      title: "UpdatedDate",
      dataIndex: "UpdatedDate",
      sorter: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <UpdateUserModal record={record}/>
          <Button
            type="primary"
            danger
            onClick={() => showPromiseConfirm(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

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
    Role,
  } = useSelector((state) => state.userManagement);
  useEffect(() => {
    // dispatch(setSearchKey({ searchKey: "afhkahsgjk" }));
    fetch({
      PageNo: PageNo,
      PageSize: PageSize,
      SearchKey: SearchKey,
      SortBy: SortBy,
      SortOrder: SortOrder,
    });
    // fetch();
  }, []);
  function onChange(pageNumber) {
    console.log("Page: ", pageNumber);
    // dispatch(setSearchKey({ searchKey: "a" }));
    dispatch(setPageNo({ PageNo: pageNumber }));
    fetch({
      PageNo: pageNumber,
      PageSize: PageSize,
      SearchKey: SearchKey,
      SortBy: SortBy,
      SortOrder: SortOrder,
    });
    // setPagination({PageNo: pageNumber, PageSize: {paginaion}});
    // console.log(getPageParams({ PageNo: pageNumber, PageSize: 7 }));
  }
  function refetch() {
    fetch({
      PageNo: PageNo,
      PageSize: PageSize,
      SearchKey: SearchKey,
      SortBy: SortBy,
      SortOrder: SortOrder,
    });
  }
  // function onShowSizeChange(current, pageSize) {
  //   console.log(current, pageSize);
  //   // setTotal(pageSize);
  //   dispatch(setPageSize({ PageSize: pageSize }));
  //   fetch({ PageNo: PageNo, PageSize: PageSize, SearchKey: SearchKey });
  // }
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
    if (filters.RoleName != null) {
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
    console.log("Fetch params", params);
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
          <CreateUserModal onSubmitModal={refetch} />
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
