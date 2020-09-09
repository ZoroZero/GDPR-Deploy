import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
// const residences = [
//   {
//     value: 'zhejiang',
//     label: 'Zhejiang',
//     children: [
//       {
//         value: 'hangzhou',
//         label: 'Hangzhou',
//         children: [
//           {
//             value: 'xihu',
//             label: 'West Lake',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     value: 'jiangsu',
//     label: 'Jiangsu',
//     children: [
//       {
//         value: 'nanjing',
//         label: 'Nanjing',
//         children: [
//           {
//             value: 'zhonghuamen',
//             label: 'Zhong Hua Men',
//           },
//         ],
//       },
//     ],
//   },
// ];
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

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        role: ["admin", "normal-user", "contact-point", "dc-member"],
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
        <Input />
      </Form.Item>

      <Form.Item
        name="role"
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
        <AutoComplete
          options={websiteOptions}
          onChange={onWebsiteChange}
          placeholder="website"
        >
          <Input />
        </AutoComplete>
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
        <AutoComplete
          options={websiteOptions}
          onChange={onWebsiteChange}
          placeholder="website"
        >
          <Input />
        </AutoComplete>
      </Form.Item>
    </Form>
  );
};
export default RegistrationForm;

// import React from "react";
// import { Modal, Form, Input, Radio } from "antd";

// const ModalFormComponent = ({ visible, onCancel, onCreate, form }) => {
//   const { getFieldDecorator } = form;
//   return (
//     <Modal
//       visible={visible}
//       title="Form within a Modal"
//       okText="Submit"
//       onCancel={onCancel}
//       onOk={onCreate}
//     >
//       <Form layout="vertical">
//         <Form.Item label="Title">
//           {getFieldDecorator("title", {
//             rules: [
//               {
//                 required: true,
//                 message: "Please input the title of collection!",
//               },
//             ],
//           })(<Input />)}
//         </Form.Item>
//         <Form.Item label="Description">
//           {getFieldDecorator("description")(<Input type="textarea" />)}
//         </Form.Item>
//         <Form.Item className="collection-create-form_last-form-item">
//           {getFieldDecorator("modifier", {
//             initialValue: "public",
//           })(
//             <Radio.Group>
//               <Radio value="public">Public</Radio>
//               <Radio value="private">Private</Radio>
//             </Radio.Group>
//           )}
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// const ModalForm = Form.create({ name: "modal_form" })(ModalFormComponent);

// export default ModalForm;
