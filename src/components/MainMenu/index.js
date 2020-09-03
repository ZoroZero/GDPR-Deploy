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
      <Menu.Item key="/users" icon={<UserOutlined />}>
        User
        <Link to="/users" />
      </Menu.Item>
      <Menu.Item key="/request-management" icon={<VideoCameraOutlined />}>
        Manage Request
        <Link to="/request-management" />
      </Menu.Item>
    </Menu>
  );
}

export default MainMenu;
