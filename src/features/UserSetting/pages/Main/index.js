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
  Avatar,
  Card,
} from "antd";
import { ExclamationCircleOutlined, AudioOutlined } from "@ant-design/icons";
import "./index.scss";
import CreateUserModal from "../../../../components/ManageUser/CreateUserModal.js";
import UpdateUserModal from "../../../../components/ManageUser/UpdateUserModal.js";
import UserSetting from "../../../../components/UserSetting/UserSettingForm.js";
import { getUsersApi, deleteUsersApi, getAccountDetailApi } from "api/user";
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
import { UserOutlined } from "@ant-design/icons";

MainPage.propTypes = {};
const { confirm } = Modal;
const { Search } = Input;
const { Meta } = Card;

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
            // refetch();
          });
      },
      onCancel() {},
    });
  }

  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const { SearchKey, PageNo, PageSize, SortBy, SortOrder, Role } = useSelector(
    (state) => state.userSetting
  );
  useEffect(() => {
    refetch();
  }, []);

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
  var newdata;
  const fetch = () => {
    setLoading(true);
    return getAccountDetailApi()
      .then((res) => {
        setLoading(false);
        setData(res.data);
        console.log("set data: ", res.data);
        newdata = res.data;
        if (res.status === 200) {
          // message.success(res.statusText);
        } else {
          message.error(res.statusText);
        }
      })
      .catch((error) => {
        message.error(error.data.message);
      });
  };

  return (
    <div>
      {/* <Row
        type="flex"
        justify="center"
        align="middle"
        // style={{ minHeight: "100vh" }}
      > */}
      {/* <Card
          hoverable
          style={{ padding: 25 }}
          cover={
            <Avatar
              size={250}
              src="https://f1.pngfuel.com/png/386/684/972/face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette-png-clip-art.png"
            />
          }
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card> */}
      <UserSetting record={newdata} />
      {/* </Row> */}
    </div>
  );
}

export default MainPage;