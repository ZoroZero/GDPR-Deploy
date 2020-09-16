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
  message,
  Menu,
  Dropdown,
} from "antd";
import {
  ExclamationCircleOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "./index.scss";
import CreateUserModal from "../../../../components/ManageUser/CreateUserModal.js";
import UpdateUserModal from "../../../../components/ManageUser/UpdateUserModal.js";
import { getUsersApi, deleteUsersApi, acdeacListUsersApi } from "api/user";
import { useSelector, useDispatch } from "react-redux";
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
        })
          .catch(() => console.log("Oops errors!"))
          .then(() => {
            refetch();
          });
      },
      onCancel() {},
    });
  }
  const columns = [
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
      render: (val) =>
        val === "admin" ? (
          <Tag color="green">ADMIN</Tag>
        ) : val === "normal-user" ? (
          <Tag color="blue">NORMAL USER</Tag>
        ) : val === "dc-member" ? (
          <Tag color="red">DC-MEMBER</Tag>
        ) : (
          <Tag color="orange">CONTACT POINT</Tag>
        ),
    },
    {
      title: "IsActive",
      dataIndex: "IsActive",
      key: "IsActive",
      // filters: [
      //   { text: "Active", value: "Active" },
      //   { text: "InActive", value: "InActive" },
      // ],
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
          <UpdateUserModal record={record} onSubmitModal={refetch} />
          <Button
            type="primary"
            // size={"small"}
            danger
            onClick={() => showPromiseConfirm(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  async function handleMenuClick(e) {
    // message.info("Click on menu item.");
    console.log("click", e);
    if (e.key == "active") {
      console.log("active list iefasdf");
      message.warning("Active all selected items");
      await acdeacListUsersApi({ listid: exportData.join(","), isactive: 1 });
      refetch();
    } else if (e.key == "deactive") {
      console.log("deactive list iefasdf");
      message.warning("Deactive all selected items");
      await acdeacListUsersApi({ listid: exportData.join(","), isactive: 0 });
      refetch();
    }
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="active" icon={<UserOutlined />}>
        Active all selected items
      </Menu.Item>
      <Menu.Item key="deactive" icon={<UserOutlined />}>
        Deactive all selected items
      </Menu.Item>
      {/* <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item> */}
    </Menu>
  );

  const dispatch = useDispatch();
  const [exportData, setExportData] = useState([]);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const { SearchKey, PageNo, PageSize, SortBy, SortOrder, Role } = useSelector(
    (state) => state.userManagement
  );
  useEffect(() => {
    fetch({
      PageNo: PageNo,
      PageSize: PageSize,
      SearchKey: SearchKey,
      SortBy: SortBy,
      SortOrder: SortOrder,
      Role: Role,
    });
  }, [PageNo, PageSize, Role]);
  function onChange(pageNumber) {
    dispatch(setPageNo({ PageNo: pageNumber }));
    fetch({
      PageNo: pageNumber,
      PageSize: PageSize,
      SearchKey: SearchKey,
      SortBy: SortBy,
      SortOrder: SortOrder,
      Role: Role,
    });
  }
  function refetch() {
    fetch({
      PageNo: PageNo,
      PageSize: PageSize,
      SearchKey: SearchKey,
      SortBy: SortBy,
      SortOrder: SortOrder,
      Role: Role,
    });
  }
  function showTotal(total) {
    return `Total ${total} items`;
  }
  function search(SearchKeyw) {
    dispatch(setSearchKey({ SearchKey: SearchKeyw }));
    dispatch(setPageNo({ PageNo: 1 }));
    fetch({
      PageNo: 1,
      PageSize: PageSize,
      SearchKey: SearchKeyw,
      SortBy: SortBy,
      SortOrder: SortOrder,
      Role: Role,
    });
  }
  function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
    console.log(PageSize);
    console.log("Total", total);
    if (pageSize !== PageSize && PageNo > Math.ceil(total / pageSize)) {
      console.log("Total1", total);
      dispatch(setPageNo(Math.ceil(total / pageSize)));
      dispatch(setPageSize({ PageSize: pageSize }));
      // fetch({
      //   PageNo: Math.ceil(total / pageSize),
      //   PageSize: pageSize,
      //   SearchKey: SearchKey,
      //   SortBy: SortBy,
      //   SortOrder: SortOrder,
      //   Role: Role,
      // });
    } else {
      console.log("Total2", total);
      dispatch(setPageSize({ PageSize: pageSize }));
      // fetch({
      //   PageNo: current,
      //   PageSize: pageSize,
      //   SearchKey: SearchKey,
      //   SortBy: SortBy,
      //   SortOrder: SortOrder,
      //   Role: Role,
      // });
    }
  }
  function handleTableChange(pagination, filters, sorter) {
    // console.log("Various parameters", pagination, filters, sorter);
    console.log("Filter", filters);
    console.log("Sorter", sorter);
    // console.log(sorter.length != 0);
    if (sorter.length !== 0) {
      dispatch(setSortBy({ SortBy: sorter.field }));
      dispatch(setSortOrder({ SortOrder: sorter.order }));
      console.log("Order", SortOrder);
      console.log("By", sorter.field);
      fetch({
        PageNo: PageNo,
        PageSize: PageSize,
        SearchKey: SearchKey,
        SortBy: sorter.field,
        SortOrder: sorter.order,
        Role: Role,
      });
    }
    if (filters.RoleName !== null) {
      dispatch(setRole({ Role: filters.RoleName.join(",") }));
      fetch({
        PageNo: PageNo,
        PageSize: PageSize,
        SearchKey: SearchKey,
        SortBy: sorter.field,
        SortOrder: sorter.order,
        Role: filters.RoleName.join(","),
      });
    } else {
      dispatch(setRole({ Role: "" }));
      fetch({
        PageNo: PageNo,
        PageSize: PageSize,
        SearchKey: SearchKey,
        SortBy: sorter.field,
        SortOrder: sorter.order,
        Role: "",
      });
    }
  }

  const fetch = (params) => {
    setLoading(true);
    return getUsersApi(params)
      .then((res) => {
        setLoading(false);
        setData(res.data);
        if (res.status === 200) {
          // message.success(res.statusText);
        } else {
          message.error(res.statusText);
        }
        if (res.data.length !== 0) setTotal(res.data[0].TotalItem);
        else setTotal(0);
        showTotal({ total });
        // setPagination({
        //   ...params.pagination,
        // });
      })
      .catch((error) => {
        message.error(error.data.message);
      });
  };

  // Handle row selected
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setExportData(selectedRowKeys);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
  const hasSelected = exportData.length > 0;
  return (
    <div>
      <Row>
        <Col span={8}>
          {/* <Button
            type="primary"
            // onClick={this.start}
            disabled={!hasSelected}
            // loading={loading}
          >
            DeActive Selected User
          </Button> */}
          <Dropdown overlay={menu} disabled={!hasSelected}>
            <Button>
              Multi actions <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
        <Col span={8}>
          <CreateUserModal onSubmitModal={refetch} />
        </Col>
        <Col span={8}>
          <Search
            placeholder="input search text"
            onSearch={(value) => search(value)}
            enterButton
          />
        </Col>
      </Row>
      <br />
      {/* <br /> */}
      <Table
        columns={columns}
        rowKey={(record) => record.Id}
        dataSource={data}
        pagination={false}
        loading={loading}
        rowSelection={rowSelection}
        onChange={handleTableChange}
        // onChange={onChangeTable}
        // onChange={handleTableChange}
      />
      <br />
      <Row>
        <Col span={12} offset={6}>
          <Pagination
            showQuickJumper
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            // defaultCurrent={1}
            current={PageNo}
            total={total}
            showTotal={showTotal}
            // defaultPageSize={10}
            pageSize={PageSize}
            onChange={onChange}
          />
        </Col>
      </Row>

      <br />
    </div>
  );
}

export default MainPage;
