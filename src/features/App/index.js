import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import "./index.scss";

import { checkToken } from "utils/localstorage";
import PropTypes from "prop-types";
import LoginPage from "features/App/pages/Login";
import NotFound from "components/NotFound";
import PrivateRoute from "components/PrivateRoute";
import MainMenu from "components/MainMenu";
import Loading from "components/Loading";
import { getStore } from "store";
import { login, onLogout } from "./slice";

const store = getStore();
const { Header, Content, Sider } = Layout;

const User = React.lazy(() =>
  import("features/ManageUser").then(async (module) => {
    const reducer = await import("features/ManageUser/slice").then(
      (slide) => slide.default
    );
    store.injectReducer("users", reducer);
    return module;
  })
);

const ManageRequest = React.lazy(() =>
  import("features/ManageRequest").then(async (module) => {
    const reducer = await import("features/ManageRequest/slice").then(
      (slide) => slide.default
    );
    store.injectReducer("requestManagement", reducer);
    return module;
  })
);

function App(props) {
  const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state.app);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const tokenCookie = checkToken();
    if (tokenCookie) dispatch(login({ token: tokenCookie }));
  }, []);

  const handleLogout = () => {
    dispatch(onLogout());
  };
  const toggle = () => setCollapsed(!collapsed);

  return (
    <div className="app">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Layout>
            {loading && <Loading />}
            {token === null ? null : (
              <Sider
                style={{ minHeight: "100vh" }}
                trigger={null}
                collapsible
                collapsed={collapsed}
              >
                <Link to="/">
                  <div className="logo" />
                </Link>
                <MainMenu />
              </Sider>
            )}
            <Layout className="site-layout">
              {token === null ? null : (
                <Header
                  className="site-layout-background"
                  style={{ padding: 0 }}
                >
                  {React.createElement(
                    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                    {
                      className: "trigger",
                      onClick: toggle,
                    }
                  )}
                  <Button
                    onClick={handleLogout}
                    style={{ float: "right", margin: 14 }}
                    type="dashed"
                    danger
                  >
                    Logout
                  </Button>
                </Header>
              )}
              <Content
                className="site-layout-background"
                style={{
                  margin: "24px 16px",
                  padding: 24,
                  minHeight: 280,
                }}
              >
                <Switch>
                  {/* <PrivateRoute path="/" component={User} /> */}
                  <Redirect exact from="/" to="/users" />
                  <PrivateRoute path="/users" component={User} />
                  <PrivateRoute
                    path="/request-management"
                    component={ManageRequest}
                  />
                  <Route exact path="/login" component={LoginPage} />
                  <Route component={NotFound} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

LoginPage.propTypes = {
  account: PropTypes.object,
  emailMessages: PropTypes.object,
  error: PropTypes.string,
  idToken: PropTypes.string,
};
export default App;
