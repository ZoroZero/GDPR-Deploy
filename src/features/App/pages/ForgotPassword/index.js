import React from "react";
import { Form, Input, Button, message, Checkbox } from "antd";
import "./index.scss";
import PropTypes from "prop-types";
import { forgotPasswordApi } from "../../../../api/user";
import { useHistory } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function ForgotPasswordPage() {
  const history = useHistory();
  const onFinish = (values) => {
    forgotPasswordApi(values.email)
      .then(() => {
        message.success(
          "Successfully! Check your email for more information!",
          9
        );
        history.push("/");
      })
      .catch((error) => {
        message.error("Error!");
        message.error(
          "Tips: Please make sure that you have entered the correct email one!"
        );
        // message.error(error.data.message);
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
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
