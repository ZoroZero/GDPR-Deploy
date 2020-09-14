import {
  Form,
  Switch,
  Button,
  Row,
  Col,
  Avatar,
  Input,
  Tooltip,
  message
} from "antd";
import {

  QuestionCircleOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAccountApi } from "../../api/user";
import UploadAvatarDynamic from "../../components/UserSetting/UploadAvatarDynamic.js";
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
  const [data, setData]=useState({});
  const [imageUrl, setImageUrl]=useState("https://f1.pngfuel.com/png/386/684/972/face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette-png-clip-art.png");
  const { record } = useSelector((state) => state.userSetting);
  const [switchState, setSwitchState] = useState(true);
  function onChange(checked) {
    console.log(`switch to ${checked}`);
    setSwitchState(checked);
  }
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    if (values.password!==undefined){
    updateAccountApi(values.UserId, {
      ...values, PassWord: values.password
    }).then((res) => {
      console.log("res from insert", res);
      if (res.status === 201) {
        message.success(res.statusText);
      }
      pros.onSubmitModal();
    })
    .catch((error) => {
      message.error(error.data.message);
    });
  pros.onSubmitModal();
  }
  else{
    updateAccountApi(values.UserId, {
      ...values, PassWord: values.HashPasswd
    }).then((res) => {
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
  }
  };
  useEffect(() => {
    // fetch();

    console.log("didmount avbc", record);
    if (record.AvatarPath){
      setImageUrl("http://localhost:5000/api/users/"+record.AvatarPath); 
    }
    else{
      setImageUrl("https://f1.pngfuel.com/png/386/684/972/face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette-png-clip-art.png");
    }
    setData(record);
    form.setFieldsValue(record);
  }, [record]);
  const fetch = () => {};
  return (
    <Form
    form={form}
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      // initialValues={
      //   {
      //     // Email: record.Email,
      //     // FirstName: data.FirstName,
      //     // LastName: record.LastName,
      //     // HashPasswd: record.HashPasswd,
      //     // UserName: record.UserName,
      //     // RoleName: record.RoleName,
      //   }
      // }
    >
      

      <Form.Item>
        <Row
          type="flex"
          justify="center"
          align="middle"
          // style={{ minHeight: "100vh" }}
        >
          <Col span={8}></Col>
          <Col span={8}><Avatar
            size={150}
            style={{ padding: 0 }}
            // src="https://f1.pngfuel.com/png/386/684/972/face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette-png-clip-art.png"
            src={imageUrl}
          /></Col>
          <Col span={8}><UploadAvatarDynamic/></Col>
          
          {/* <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload> */}
          
        </Row>
      </Form.Item>

      {/* <Form.Item name="rate" label="Rate">
        <Rate />
      </Form.Item> */}
    <Form.Item
        name="UserId"
        label="ID"
        rules={[
          {
            // required: true,
            message: "Please input your ID!",
            whitespace: true,
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
        label="Old Password"
        rules={[
          {
            required: true,
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
            // required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            // required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item
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
            // required: true,
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
            // required: true,
            message: "Please input your role name!",
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
