import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, Link } from "react-router-dom";
import { Menu, Avatar, Badge } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { AbilityContext } from "permission/can";
import { useAbility } from "@casl/react";
import { useSelector, useDispatch } from "react-redux";

MainMenu.propTypes = {};

function MainMenu(props) {
  const { username, avatar } = useSelector((state) => state.app);
  const location = useLocation();
  const ability = useAbility(AbilityContext);
  return (
    <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
      {
        <Menu.Item
          key="/user-setting"
          icon={
            <Avatar
              style={{ marginRight: "0.82em" }}
              icon={<UserOutlined />}
              src={`http://localhost:5000/api/users/${avatar}`}
            />
          }
        >
          <b>{`Hi ${username}!`}</b>
          <Link to="/user-setting" />
        </Menu.Item>
      }
      {ability.can("access", "manage-user") && (
        <Menu.Item key="/user-management" icon={<UserOutlined />}>
          Manage User
          <Link to="/user-management" />
        </Menu.Item>
      )}
      {ability.can("access", "manage-request") && (
        <Menu.Item key="/request-management" icon={<VideoCameraOutlined />}>
          Manage Request
          <Link to="/request-management" />
        </Menu.Item>
      )}
      {ability.can("access", "manage-server") && (
        <Menu.Item key="/server-management" icon={<VideoCameraOutlined />}>
          Manage Server
          <Link to="/server-management" />
        </Menu.Item>
      )}
      {ability.can("access", "manage-customer") && (
        <Menu.Item key="/customer-management" icon={<VideoCameraOutlined />}>
          Manage Customer
          <Link to="/customer-management" />
        </Menu.Item>
      )}
    </Menu>
  );
}

export default MainMenu;
