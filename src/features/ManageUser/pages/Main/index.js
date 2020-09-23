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
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "./index.scss";
import CreateUserModal from "../../../../components/ManageUser/CreateUserModal.js";
import UpdateUserModal from "../../../../components/ManageUser/UpdateUserModal.js";
import { getUsersApi, deleteUsersApi, acdeacListUsersApi } from "api/user";
import { useSelector, useDispatch } from "react-redux";
// import {
//   setSearchKey,
//   setPageNo,
//   setPageSize,
//   setSortBy,
//   setSortOrder,
//   setRole,
// } from "../../slice";

MainPage.propTypes = {};
const { confirm } = Modal;
const { Search } = Input;

function MainPage() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  function showPromiseConfirm(row) {
    confirm({
      title: "Do you want to delete user " + row.UserName,
      icon: <ExclamationCircleOutlined />,
      content: "Warning: The delete user cannot be recover",
      onOk() {
        return new Promise((resolve, reject) => {
          deleteUsersApi(row.Id)
            .then((res) => {
              if (res.status === 200) {
                // message.success(res.statusText);
              } else {
                message.error(res.statusText);
              }
            })
            .catch((error) => {
              message.error(error.data.message);
            });
          setTimeout(Math.random() > 0.5 ? resolve : reject, 200);
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
    // {
    //   title: "HashPasswd",
    //   dataIndex: "HashPasswd",
    // },
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
      filterMultiple: false,
      filters: [
        { text: "Active", value: true },
        { text: "InActive", value: false },
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
          <UpdateUserModal record={record} onSubmitModal={refetch} />
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

  async function handleMenuClick(e) {
    console.log("click", e);
    if (e.key == "active") {
      message.warning("Active all selected items");
      await acdeacListUsersApi({
        listid: selectedRowKeys.join(","),
        isactive: 1,
      })
        .then((res) => {
          if (res.status === 200) {
            message.success(res.statusText);
          } else {
            message.error(res.statusText);
          }
        })
        .catch((error) => {
          message.error(error.data.message);
        });
      refetch();
    } else if (e.key == "deactive") {
      message.warning("Deactive all selected items");
      await acdeacListUsersApi({
        listid: selectedRowKeys.join(","),
        isactive: 0,
      })
        .then((res) => {
          if (res.status === 200) {
            message.success(res.statusText);
          } else {
            message.error(res.statusText);
          }
        })
        .catch((error) => {
          message.error("Oops, error!");
        });
      refetch();
    }
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="active" icon={<CheckCircleOutlined />}>
        Active all selected items
      </Menu.Item>
      <Menu.Item key="deactive" icon={<CloseCircleOutlined />}>
        Deactive all selected items
      </Menu.Item>
    </Menu>
  );
  const [SearchKey, setSearchKey] = useState("");
  const [SortBy, setSortBy] = useState("");
  const [SortOrder, setSortOrder] = useState("ascend");
  const [Role, setRole] = useState("");
  const [IsActive, setIsActive] = useState(undefined);
  const [PageNo, setPageNo] = useState(1);
  const [PageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();
  const [exportData, setExportData] = useState([]);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false);
  const {} = useSelector((state) => state.userManagement);
  useEffect(() => {
    console.log("useeffect");
    fetch({
      PageNo: PageNo,
      PageSize: PageSize,
      SearchKey: SearchKey,
      SortBy: SortBy,
      SortOrder: SortOrder,
      Role: Role,
      IsActive: IsActive,
    });
  }, [PageNo, PageSize, SearchKey, SortBy, SortOrder, Role, IsActive]);
  function refetch() {
    fetch({
      PageNo: PageNo,
      PageSize: PageSize,
      SearchKey: SearchKey,
      SortBy: SortBy,
      SortOrder: SortOrder,
      Role: Role,
      IsActive: IsActive,
    });
  }
  function showTotal(total) {
    return `Total ${total} items`;
  }
  function search(SearchKeyw) {
    setSelectedRowKeys([]);
    setSearchKey(SearchKeyw.trim());
    setPageNo(1);
  }
  function handleTableChange(pagination, filters, sorter) {
    console.log("filter", filters);
    if (sorter.length !== 0) {
      setSortBy(sorter.field);
      setSortOrder(sorter.order);
    }
    if (filters.RoleName !== null) {
      setSelectedRowKeys([]);
      setRole(filters.RoleName.join(","));
      setPageNo(1);
    } else {
      setRole("");
    }
    if (filters.IsActive !== null) {
      setSelectedRowKeys([]);
      setIsActive(filters.IsActive[0]);
      setPageNo(1);
    } else {
      setIsActive(undefined);
    }
  }

  // Handle change in page number
  const handlePageChange = (pageNumber, pageSize) => {
    if (pageSize !== PageSize && PageNo > Math.ceil(total / pageSize)) {
      console.log("Total1", total);
      setPageSize(pageSize);
      if (Math.ceil(total / pageSize) !== 0) {
        setPageNo(Math.ceil(total / pageSize));
      } else {
        setPageNo(1);
      }
    } else {
      console.log("Total2", total);
      setPageSize(pageSize);
      setPageNo(pageNumber);
    }
  };

  const fetch = (params) => {
    setLoading(true);
    return getUsersApi(params)
      .then((res) => {
        setLoading(false);
        setData(res.data);
        if (res.status === 200) {
        } else {
          message.error(res.statusText);
        }
        if (res.data.length !== 0) setTotal(res.data[0].TotalItem);
        else setTotal(0);
        showTotal({ total });
      })
      .catch((error) => {
        message.error(error.data.message);
      });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      console.log("selectedRowKeys changed: ", newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <Row>
        <Col span={8}>
          <CreateUserModal onSubmitModal={refetch} />
        </Col>
        <Col span={8}></Col>
        <Col span={8}>
          <Search
            placeholder="input search text"
            onSearch={(value) => search(value)}
            enterButton
            autoFocus={true}
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: "10px", marginTop: "10px" }}>
        <Dropdown overlay={menu} disabled={!hasSelected}>
          <Button>
            Multi actions <DownOutlined />
          </Button>
        </Dropdown>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </Row>

      <Table
        columns={columns}
        rowKey={(record) => record.Id}
        dataSource={data}
        pagination={false}
        loading={loading}
        rowSelection={rowSelection}
        onChange={handleTableChange}
        scroll={{ x: 1500}}
      />
      <br />
      <Row>
        <Col span={12} offset={6}>
          <Pagination
            showQuickJumper
            showSizeChanger
            // onShowSizeChange={onShowSizeChange}
            onChange={handlePageChange}
            current={PageNo}
            total={total}
            showTotal={showTotal}
            pageSize={PageSize}
            // onChange={onChange}
          />
        </Col>
      </Row>

      <br />
    </div>
  );
}

export default MainPage;
