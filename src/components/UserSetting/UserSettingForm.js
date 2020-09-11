import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
  Avatar,
  Card,
  Input,
  Cascader,
  Tooltip,
} from "antd";
import {
  UploadOutlined,
  InboxOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import React, { Component, useState, useEffect } from "react";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const roles = [
  {
    value: "admin",
    label: "admin",
  },
  {
    value: "normal-user",
    label: "normal-user",
  },
  {
    value: "contact-point",
    label: "contact-point",
  },
  {
    value: "dc-member",
    label: "dc-member",
  },
];

const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const UserSetting = (record) => {
  useEffect(() => {
    fetch();
  }, [record]);
  const fetch = () => {};
  const [switchState, setSwitchState] = useState(true);
  function onChange(checked) {
    console.log(`switch to ${checked}`);
    setSwitchState(checked);
  }
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      // initialValues={{
      //   Email: record.Email,
      //   FirstName: record.FirstName,
      //   LastName: record.LastName,
      //   HashPasswd: record.HashPasswd,
      //   UserName: record.UserName,
      //   RoleName: record.RoleName,
      // }}
    >
      <Form.Item>
        <Row
          type="flex"
          justify="center"
          align="middle"
          // style={{ minHeight: "100vh" }}
        >
          <Avatar
            size={250}
            style={{ padding: 25 }}
            src="https://f1.pngfuel.com/png/386/684/972/face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette-png-clip-art.png"
          />
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Row>
      </Form.Item>

      {/* <Form.Item name="rate" label="Rate">
        <Rate />
      </Form.Item> */}
      <Form.Item
        name="FirstName"
        label="First Name"
        rules={[
          {
            required: true,
            message: "Please input Firstname!",
          },
        ]}
        value={record.FirstName}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="LastName"
        label="Last Name"
        rules={[
          {
            required: true,
            message: "Please input Lastname!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="Email"
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

      <Form.Item
        name="HashPasswd"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="newpassword"
        label="New Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm New Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="UserName"
        label={
          <span>
            Username&nbsp;
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: "Please input your username!",
            whitespace: true,
          },
        ]}
      >
        <Input disabled={true} />
      </Form.Item>

      <Form.Item
        name="RoleName"
        label="Role permission"
        rules={[
          {
            required: true,
            message: "Please input your username!",
            whitespace: true,
          },
        ]}
      >
        <Input disabled={true} />
      </Form.Item>

      <Form.Item name="IsActive" label="Status">
        <Switch
          disabled={true}
          checkedChildren="Active"
          unCheckedChildren="InActive"
          defaultChecked={switchState}
          onChange={onChange}
        />
      </Form.Item>

      {/* <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="longgggggggggggggggggggggggggggggggggg"
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Dragger">
        <Form.Item
          name="dragger"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item> */}

      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Button type="primary" htmlType="submit">
          Apply New Change
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserSetting;
