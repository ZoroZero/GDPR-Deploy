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
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAccountPassApi } from "../../api/user";
import UploadAvatarDynamic from "./UploadAvatarDynamic.js";
import { setua } from "features/App/slice";
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const UserSettingPassword = (pros) => {
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
    updateAccountPassApi({
      ...values,
      PassWord: values.password,
    })
      .then((res) => {
        if (res.status === 200) {
          message.success(res.statusText);
        } else {
          message.error(res.statusText);
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
      <Form.Item
        name="Pass"
        label="Old Password"
        rules={[
          {
            required: true,
            message: "Please input your old password!",
          },
          { min: 5, message: "Password must be minimum 5 characters." },
          {
            pattern: "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])",
            message:
              "Password must include number, uppercase and lowercase character",
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
            required: true,
            message: "Please input your password!",
          },
          { min: 5, message: "Password must be minimum 5 characters." },
          {
            pattern: "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])",
            message:
              "Password must include number, uppercase and lowercase character",
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
      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Button type="primary" htmlType="submit">
          Change Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserSettingPassword;
