/* TODO: 
*/
import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  notification,
  Select,
  Switch,
} from "antd";
import { createCustomerApi } from "api/customer";
import {
  getContactPointList,
  setPagination,
  setRefresh,
} from "features/ManageCustomer/slice";
import { useSelector, useDispatch } from "react-redux";

const { Option } = Select;
const { TextArea } = Input;

function AddCustomerModal(props) {
  const dispatch = useDispatch();
  const { refresh, pagination, contactPoints } = useSelector(
    (state) => state.customerManagement
  );
  const [form] = Form.useForm();
  const shouldGetData = props.modalVisible !== false;

  useEffect(() => {
    if (shouldGetData) {
      form.setFieldsValue({
        FirstName: "",
        LastName: "",
        ContactPointId: null,
        ContractBeginDate: null,
        ContractEndDate: null,
        Description: "",
        IsActive: true,
      });
      dispatch(getContactPointList());
    }
  }, [shouldGetData]);

  const handleOk = () => {
    props.setModalVisible(false);
    form.submit();
  };

  const handleCancel = () => {
    props.setModalVisible(false);
  };

  async function onFinish(values) {
    console.log(values);
    try {
      createCustomerApi(values);
      await dispatch(setPagination({ ...pagination, current: 1 }));
      dispatch(setRefresh(!refresh));
      openNotification("Sucessfully add new customer");
    } catch (error) {
      console.log(error);
    }
  }

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
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={onFinish} name="myForm" layout="vertical">
        <Form.Item
          label="First name"
          name="FirstName"
          rules={[

            {
              required: true,
              message: "Please enter your first name!",

            }
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
              message: "Please enter your last name!",
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
            filterOption={(input, option) =>
              option.children
                .toString()
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 1
            }
          >
            {contactPoints.length > 0 &&
              contactPoints.map((item) => (
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
          ><DatePicker
              showTime style={{ width: "100%" }} />
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
            <DatePicker
              showTime style={{ width: "100%" }} />
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
            defaultChecked="Active"
          ></Switch>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddCustomerModal;
