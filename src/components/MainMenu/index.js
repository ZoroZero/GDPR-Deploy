import React from "react";
import PropTypes from "prop-types";
import { useLocation, Link } from "react-router-dom";
import { Menu } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";

MainMenu.propTypes = {};

function MainMenu(props) {
  const location = useLocation();
  return (
    <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
      <Menu.Item key="/user-management" icon={<UserOutlined />}>
        Manage User
        <Link to="/user-management" />
      </Menu.Item>
      <Menu.Item key="/request-management" icon={<VideoCameraOutlined />}>
        Manage Request
        <Link to="/request-management" />
      </Menu.Item>
      <Menu.Item key="/server-management" icon={<VideoCameraOutlined />}>
        Manage Server
        <Link to="/server-management" />
      </Menu.Item>
      <Menu.Item key="/customer-management" icon={<VideoCameraOutlined />}>
        Manage Customer
        <Link to="/customer-management" />
      </Menu.Item>
    </Menu>
  );
}

export default MainMenu;
