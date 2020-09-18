import React, { useState, useEffect } from "react";
import { updateUsersApi } from "../../api/user";
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
  Switch,
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

const CollectionCreateForm = ({
  visible,
  onCreate,
  onCancel,
  record,
  switchState,
  setSwitchState,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    // console.log("didamount record", record);
    // form.setFieldsValue({
    //   email: record.Email,
    //   firstname: record.FirstName,
    //   lastname: record.LastName,
    //   password: record.HashPasswd,
    //   confirm: record.HashPasswd,
    //   username: record.UserName,
    //   role: [record.RoleName],
    // });
    setSwitchState(record.IsActive);
  }, [record]);

  const onFinish = (values) => {
    console.log("Received values of form: ", { ...values, switchState });
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  function onChange(checked) {
    console.log(`switch to ${checked}`);
    setSwitchState(checked);
  }
  return (
    <Modal
      visible={visible}
      // title={record.Id}
      title="Update User"
      okText="Update"
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
          email: record.Email,
          firstname: record.FirstName,
          lastname: record.LastName,
          // password: record.HashPasswd,
          // confirm: record.HashPasswd,
          username: record.UserName,
          rolelist: [record.RoleName],
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
          <Input disabled={true} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
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
          ]}
        >
          <Input disabled={true} />
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
        <Form.Item name="isactive" label="Status">
          <Switch
            checkedChildren="Active"
            unCheckedChildren="InActive"
            checked={switchState}
            onChange={onChange}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const UpdateUserModal = (pros) => {
  const [switchState, setSwitchState] = useState(pros.record.IsActive);
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", {
      ...values,
      IsActive: switchState,
    });
    updateUsersApi(pros.record.Id, {
      ...values,
      role: values.rolelist[0],
      IsActive: switchState,
      firstname: values.firstname.trim(), 
      lastname: values.lastname.trim()
    })
      .then((res) => {
        if (res.status === 200) {
          message.success(res.statusText);
        }
        pros.onSubmitModal();
      })
      .catch((error) => {
        message.error(error.data.message);
      });

    setVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        // size={"small"}
        // style={{ color: "blue", borderColor: "blue" }}
        onClick={() => {
          setVisible(true);
        }}
      >
        Update
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        record={pros.record}
        switchState={switchState}
        setSwitchState={setSwitchState}
      />
    </>
  );
};

export default UpdateUserModal;
