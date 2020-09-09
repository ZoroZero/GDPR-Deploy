import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Button, notification, Cascader, Select, Switch } from "antd";
import { createCustomerApi } from "api/customer";
import getContactPoints from

  function AddEditCustomerModal(props) {

    const { TextArea } = Input;
    const [form] = Form.useForm();
    const contactPoints = getContactPoints();


    useEffect(() => {
      form.setFieldsValue({
        FirstName: "",
        LastName: "",
        ContactPointEmail: "",
        ContractBeginDate: null,
        ContractEndDate: null,
        Description: "",
        IsActive: true,
      });
    }, []);

    const onReset = () => {
      form.resetFields();
    };

    const onFinish = (values) => {
      console.log(values);
      return createCustomerApi(values)
        .then((res) => {
          openNotification("Sucessfully add new customer");
          props.setModalVisible(false);
          form.resetFields();
        })
        .catch((err) => console.log(err));
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
                message: "Please input first name of customer!",
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
                message: "Please input last name of customer!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contact Point"
            name="ContactPointEmail"



          >
            <Cascader options={contactPoints} />
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
            <Switch checkedChildren='Active' unCheckedChildren='InActive' defaultChecked ></Switch>
          </Form.Item>
        </Form>


      </Modal >
    );
  }

export default AddEditCustomerModal;
