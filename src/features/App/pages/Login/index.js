import React from "react";
import { Form, Input, Button, message, Checkbox, Row, Col } from "antd";
import "./index.scss";
import PropTypes from "prop-types";
import { onLogin } from "features/App/slice";
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
        console.log(error.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container">
      <div style={{ width: "33%" }}>
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
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            initialValue="u7Rg2KBu"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 5, message: 'Password must be minimum 5 characters.' },
              { pattern: "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])", message: 'Password must include number, uppercase and lowercase character'}]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Row>
              <Col span={8}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Col>
              <Col span={8}></Col>
              <Col span={8}>
                <Button
                  className="login-form-forgot"
                  onClick={() => {
                    history.push("/forgotpassword");
                  }}
                >
                  Forgot password
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  account: PropTypes.object,
  emailMessages: PropTypes.object,
  error: PropTypes.string,
  idToken: PropTypes.string,
};
export default LoginPage;
