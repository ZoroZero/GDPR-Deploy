/* TODO: 
- disable day before begin day
*/
import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Button,
  notification,
  Select,
  Switch,
} from "antd";
import { updateCustomerApi } from 'api/customer'
import { createCustomerApi } from "api/customer";
import { getContactPointsApi } from "api/customer";

function AddEditCustomerModal(props) {
  const { Option } = Select;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [contactPoints, setContactPoints] = useState([]);

  useEffect(() => {
    console.log(props)

    form.setFieldsValue(props.dataForm);



  }, [props]);

  // const onReset = () => {
  //   form.resetFields();
  // };

  const handleSelectChange = (value) => {
    console.log(value);
  };
  const onFinish = (values) => {
    console.log(values)
    return createCustomerApi(values)
      .then((res) => {
        props.setPage(1);
        props.setRefresh(!props.refresh);
        openNotification("Sucessfully add new customer");
        props.setModalVisible(false);
        form.resetFields();
      })
      .catch((err) => console.log(err));


  };


  const fetchContactPoints = () => {
    getContactPointsApi().then((res) => {
      setContactPoints(res);
      console.log(res);
    });
  };


  const openNotification = (message) => {
    notification.open({
      message: "Successfully create Customer",
      description: message,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  return (
    <Modal
      title="Create new Customer"
      centered
      visible={props.modalVisible}
      forceRender={true}
      footer={[
        <Button form="myForm" key="submit" type="primary" htmlType="submit">
          Submit
        </Button>,
        <Button
          key="cancel"
          onClick={() => {
            props.setModalVisible(false);
          }}
        >
          Cancel
        </Button>,
      ]}
    >
      <Form form={form} onFinish={onFinish} id="myForm" layout="vertical">
        <Form.Item
          label="First name"
          name="FirstName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last name"
          name="LastName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Contact Point" name="ContactPointId">
          <Select
            showSearch
            placeholder="Select a contact point"
            optionFilterProp="children"
            onChange={handleSelectChange}
            onFocus={fetchContactPoints}
            filterOption={(input, option) =>
              option.children
                .toString()
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {" "}
            {contactPoints.map((item) => (
              <Option key={item.Id}> {item.Email} </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Form.Item
            label="Contract begin date"
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            name="ContractBeginDate"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <DatePicker showTime style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Contract end date"
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
            name="ContractEndDate"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <DatePicker showTime style={{ width: "100%" }} />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="Description"
          name="Description"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <TextArea rows={3}></TextArea>
        </Form.Item>
        <Form.Item name="IsActive">
          <Switch
            checkedChildren="Active"
            unCheckedChildren="InActive"
            defaultChecked
          ></Switch>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddEditCustomerModal;
