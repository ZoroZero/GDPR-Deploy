import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Button, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "./index.scss";
import { checkToken } from "utils/localstorage";
import PropTypes from "prop-types";
import LoginPage from "features/App/pages/Login";
import ForgotPasswordPage from "features/App/pages/ForgotPassword";
import HomePage from "features/App/pages/Home";
import NotFound from "components/NotFound";
import PrivateRoute from "components/PrivateRoute";
import MainMenu from "components/MainMenu";
import Loading from "components/Loading";
import { getStore } from "store";
import { login, onLogout } from "./slice";
import { AbilityContext } from "permission/can";
import { useAbility } from "@casl/react";
import { VerifyAcc } from "./pages/VerifyScreen";
import { setua } from "features/App/slice";
import { getAccountDetailApi } from "api/user";

const store = getStore();
const { Header, Content, Sider } = Layout;

const ManageUser = React.lazy(() =>
  import("features/ManageUser").then(async (module) => {
    const reducer = await import("features/ManageUser/slice").then(
      (slide) => slide.default
    );
    store.injectReducer("userManagement", reducer);
    return module;
  })
);

const UserSetting = React.lazy(() =>
  import("features/UserSetting").then(async (module) => {
    const reducer = await import("features/UserSetting/slice").then(
      (slide) => slide.default
    );
    store.injectReducer("userSetting", reducer);
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

const ManageServer = React.lazy(() =>
  import("features/ManageServer").then(async (module) => {
    const reducer = await import("features/ManageServer/slice").then(
      (slide) => slide.default
    );
    store.injectReducer("serverManagement", reducer);
    return module;
  })
);

const ManageCustomer = React.lazy(() =>
  import("features/ManageCustomer").then(async (module) => {
    const reducer = await import("features/ManageCustomer/slice").then(
      (slide) => slide.default
    );
    store.injectReducer("customerManagement", reducer);
    return module;
  })
);

function App(props) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.app);
  const [collapsed, setCollapsed] = useState(false);
  const ability = useAbility(AbilityContext);

  useEffect(() => {
    const token = checkToken();
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    if (token)
      dispatch(login({ access_token: token, role: role, userId: userId }));
    getAccountDetailApi()
      .then((res) => {
        dispatch(
          setua({
            username: res.data.UserName,
            avatar: res.data.AvatarPath,
          })
        );
      })
      .catch((error) => {
        handleLogout()
        message.error(error.data.message);
      });
  });

  const handleLogout = () => {
    dispatch(onLogout());
  };
  const toggle = () => setCollapsed(!collapsed);

  return (
    <div className="app">
      <Suspense fallback={<div>Loading ...</div>}>
        <Layout>
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
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
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

            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
              }}
            >
              <Switch>
                {ability.can("access", "manage-user") && (
                  <PrivateRoute
                    path="/user-management"
                    component={ManageUser}
                  />
                )}
                {<PrivateRoute path="/user-setting" component={UserSetting} />}

                {ability.can("access", "manage-request") && (
                  <PrivateRoute
                    path="/request-management"
                    component={ManageRequest}
                  />
                )}
                {ability.can("access", "manage-server") && (
                  <PrivateRoute
                    path="/server-management"
                    component={ManageServer}
                  />
                )}
                {ability.can("access", "manage-customer") && (
                  <PrivateRoute
                    path="/customer-management"
                    component={ManageCustomer}
                  />
                )}
                <PrivateRoute path="/" exact component={HomePage} />
                <Route component={NotFound} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Suspense>
    </div>
  );
}

function Router(props) {
  const { loading } = useSelector((state) => state.app);
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      {loading && <Loading />}
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/forgotpassword" component={ForgotPasswordPage} />
          <Route path="/confirm/:verifyToken" component={VerifyAcc} />
          <PrivateRoute path="/" component={App} />

          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default Router;
