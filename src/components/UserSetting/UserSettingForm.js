import {
  Form,
  Switch,
  Button,
  Row,
  Col,
  Avatar,
  Input,
  Tooltip,
  message,
  Descriptions,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAccountApi } from "../../api/user";
import UploadAvatarDynamic from "../../components/UserSetting/UploadAvatarDynamic.js";
import { setua } from "features/App/slice";
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const UserSetting = (pros) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [imageUrl, setImageUrl] = useState(
    "https://f1.pngfuel.com/png/386/684/972/face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette-png-clip-art.png"
  );
  const { record } = useSelector((state) => state.userSetting);
  const [switchState, setSwitchState] = useState(true);
  function onChange(checked) {
    console.log(`switch to ${checked}`);
    setSwitchState(checked);
  }
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    console.log("id", id);
    updateAccountApi({
      ...values,
      UserId: id,
      FirstName: values.FirstName.trim(),
      LastName: values.LastName.trim(),
    })
      .then((res) => {
        console.log("res from update account", res);
        if (res.status === 200) {
          message.success(res.statusText);
        }
        pros.onSubmitModal();
      })
      .catch((error) => {
        message.error(error.data.message);
      });
    pros.onSubmitModal();
  };
  useEffect(() => {
    dispatch(setua({ username: record.UserName, avatar: record.AvatarPath }));
    if (record.AvatarPath) {
      setImageUrl(
        process.env.REACT_APP_BASE_URL + "/api/users/" + record.AvatarPath
      );
    } else {
      setImageUrl(
        "https://f1.pngfuel.com/png/386/684/972/face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette-png-clip-art.png"
      );
    }
    setId(record.UserId);
    form.setFieldsValue(record);
  }, [record]);
  const fetch = () => {};
  return (
    <Form
      form={form}
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
    >
      <Form.Item>
        <Row type="flex" justify="center" align="middle">
          <Col span={8}></Col>
          <Col span={8}>
            {/* <Row>
              <Avatar size={150} style={{ padding: 0 }} src={imageUrl} />
            </Row> */}
            <Row>
              <UploadAvatarDynamic onsub={pros.onSubmitModal} />
            </Row>
          </Col>
          <Col span={8}></Col>

          {/* <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload> */}
        </Row>
      </Form.Item>

      {/* <Form.Item
        name="UserId"
        label="ID"
        rules={[
          {
            message: "Please input your ID!",
            whitespace: true,
          },
        ]}
      >
        <Input disabled={true} />
      </Form.Item> */}
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
        <Input disabled={true} />
      </Form.Item>
      <Form.Item
        name="FirstName"
        label="First Name"
        rules={[
          {
            required: true,
            message: "Please input Firstname!",
          },
          {
            pattern: "(?=[0-9a-zA-Z](.*))",
            message: "Firstname must not null",
          },
        ]}
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
          {
            pattern: "(?=[0-9a-zA-Z](.*))",
            message: "Lastname must not null",
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item
        name="Pass"
        label="Old Password"
        rules={[
          {
            // required: true,
            message: "Please input your old password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="password"
        label="New Password"
        rules={[
          {
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
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
      </Form.Item> */}

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
            message: "Please input your role name!",
            whitespace: true,
          },
        ]}
      >
        <Input disabled={true} />
      </Form.Item>

      {/* <Form.Item name="IsActive" label="Status">
        <Switch
          disabled={true}
          checkedChildren="Active"
          unCheckedChildren="InActive"
          defaultChecked={switchState}
          onChange={onChange}
        />
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
