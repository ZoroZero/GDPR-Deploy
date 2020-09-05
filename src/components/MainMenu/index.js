import React from "react";
import PropTypes from "prop-types";
import { useLocation, Link } from "react-router-dom";
import { Menu } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { AbilityContext } from "permission/can";
import { useAbility } from "@casl/react";

MainMenu.propTypes = {};

function MainMenu(props) {
  const location = useLocation();
  const ability = useAbility(AbilityContext);
  return (
    <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
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
