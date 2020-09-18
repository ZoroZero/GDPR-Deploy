import React, { useState } from "react";
import { insertUsersApi } from "../../api/user";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Button,
  AutoComplete,
  Modal,
  message,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

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
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Modal
      visible={visible}
      title="Create a new user"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          role: [],
          prefix: "86",
        }}
        scrollToFirstError
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

        <Form.Item
          name="password"
          label="Password"
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
            { min: 5, message: "Password must be minimum 5 characters." },
            {
              pattern: "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])",
              message:
                "Password must include number, uppercase and lowercase character",
            },
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
          name="username"
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
            { min: 5, message: "Username must be minimum 5 characters." }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="rolelist"
          label="Role permission"
          rules={[
            {
              type: "array",
              required: true,
              message: "Please select role!",
            },
          ]}
        >
          <Cascader options={roles} />
        </Form.Item>

        <Form.Item
          name="firstname"
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
          name="lastname"
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
      </Form>
    </Modal>
  );
};

const CreateUserModal = (pros) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    insertUsersApi({ ...values, role: values.rolelist[0], firstname: values.firstname.trim(), lastname: values.lastname.trim(), username: values.username.trim() })
      .then((res) => {
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
    setVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Create New User
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </>
  );
};

export default CreateUserModal;
