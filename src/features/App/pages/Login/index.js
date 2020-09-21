import React from "react";
import { Form, Input, Button, message, Checkbox, Row, Col, Card } from "antd";
import "./index.scss";
import PropTypes from "prop-types";
import { logout, onLogin } from "features/App/slice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

LoginPage.propTypes = {};

function LoginPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const onFinish = (values) => {
    dispatch(onLogin(values.username, values.password))
      .then(() => {
        message.success("login successfully");
        history.push("/");
      })
      .catch((error) => {
        message.error("login fail");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container">
      <div className="login-form-container" style={{ width: "23vw" }}>
        <Card className="login-form" style={{ padding: "15px 27px 15px 0px" }}>
          <div className="header">
            <img
              src={window.location.origin + "/logo.png"}
              height="100px"
              alt="React Starter"
            />
            {/* <h1>GDPR</h1> */}
            <h1>GDPR System</h1>
          </div>

          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              initialValue="obythelli"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              initialValue="u7Rg2KBu"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 5, message: "Password must be minimum 5 characters." },
                {
                  pattern: "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])",
                  message:
                    "Password must include number, uppercase and lowercase character",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" style={{ width: "35%" }}>
                Submit
              </Button>
              <Button
                className="login-form-forgot"
                onClick={() => {
                  history.push("/forgotpassword");
                }}
                style={{ width: "65%" }}
              >
                Forgot password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
    // <div class="container">
    //   <div class="card card-container">
    //     <img
    //       src={window.location.origin + "/logo.png"}
    //       height="100px"
    //       alt="React Starter"
    //     />
    //     <h1 class="text-center">Login Page</h1>
    //     <p id="profile-name" class="profile-name-card"></p>
    //     <form action="./RequestList.html" class="form-signin">
    //       <span id="reauth-email" class="reauth-email"></span>
    //       <input
    //         type="username"
    //         id="inputEmail"
    //         class="form-control"
    //         placeholder="Username"
    //         required
    //         autofocus
    //       />
    //       <input
    //         type="password"
    //         id="inputPassword"
    //         class="form-control"
    //         placeholder="Password"
    //         required
    //       />
    //       {/* <div id="remember" class="checkbox">
    //         <label>
    //           <input type="checkbox" value="remember-me" /> Remember me
    //         </label>
    //       </div> */}
    //       <button class="btn btn-block btn-signin" type="submit">
    //         Sign in
    //       </button>
    //     </form>
    //     <script type="text/javascript" src="./js/login.js"></script>
    //     <a href="#" class="forgot-password">
    //       Forgot the password?
    //     </a>
    //   </div>
    // </div>
  );
}

LoginPage.propTypes = {
  account: PropTypes.object,
  emailMessages: PropTypes.object,
  error: PropTypes.string,
  idToken: PropTypes.string,
};
export default LoginPage;
