import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  notification,
  Select,
  Switch,
} from "antd";
import { updateCustomerApi } from "api/customer";
import { getContactPointList, setRefresh } from "../../features/ManageCustomer/slice";
import moment from "moment";

const { Option } = Select;
const { TextArea } = Input;

function EditCustomerModal(props) {
  const dispatch = useDispatch();
  const { refresh, contactPoints } = useSelector(
    (state) => state.customerManagement
  );
  const [isActive, setIsActive] = useState(props.record.IsActive);
  const [form] = Form.useForm();
  const contactPointId = props.record.ContactPointId;
  const shouldGetData = props.modalVisible !== false;

  useEffect(() => {
    if (shouldGetData) {
      {
        console.log("USE EFFECT", props);
        form.setFieldsValue({
          ContractBeginDate: props.record.ContractBeginDate
            ? moment(props.record.ContractBeginDate, "DD/MM/YYYY HH:mm:ss")
            : null,
          ContractEndDate: props.record.ContractEndDate
            ? moment(props.record.ContractEndDate, "DD/MM/YY HH:mm:ss")
            : null,
          FirstName: props.record.FirstName,
          LastName: props.record.LastName,
          ContactPointId: contactPointId,

          Description: props.record.Description,
          IsActive: props.record.IsActive,
        });
        dispatch(getContactPointList());
      }
      setIsActive(props.record.IsActive);
    }
  }, [shouldGetData, props.record]);

  const onFinish = (values) => {
    return updateCustomerApi(values, props.record.Id)
      .then((res) => {
        dispatch(setRefresh(!refresh));
        openNotification("Sucessfully update customer");
      })
      .catch((err) => console.log(err));
  };

  const openNotification = (message) => {
    notification.open({
      message: "Successfully update Customer",
      description: message,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  const handleOk = () => {
    props.setModalVisible(false);
    form.submit();
  };

  const handleCancel = () => {
    props.setModalVisible(false);
  };

  return (
    <div>
      <Modal
        title="Update new Customer"
        centered
        visible={props.modalVisible}
        forceRender={true}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          onFinish={onFinish}
          name="myFormEdit"
          layout="vertical"
        >
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
              filterOption={(input, option) =>
                option.children
                  .toString()
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 1
              }
            >
              {contactPoints.length > 0 &&
                contactPoints.map((item) => (
                  <Option disabled={item.IsActive} key={item.Id}> {item.Email} </Option>
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
              checked={isActive}
              onChange={(e) => {
                setIsActive(e);
              }}
            ></Switch>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EditCustomerModal;

