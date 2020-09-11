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
import { getContactPointsApi } from "api/customer";
import moment from 'moment'
function EditCustomerModal(props) {
    const { Option } = Select;
    const { TextArea } = Input;
    const [form] = Form.useForm();
    const [contactPoints, setContactPoints] = useState([]);
    const contactPointId = props.record.ContactPointId;
    const contactPointEmail = props.record.ContactPointEmail;

    useEffect(() => {
        console.log("useEffect props", props)
        form.setFieldsValue({
            FirstName: props.record.FirstName, LastName: props.record.LastName,
            ContactPointId: contactPointId,
            ContractBeginDate: props.record.ContractBeginDate ? moment(props.record.ContractBeginDate) : null,
            ContractEndDate: props.record.ContractEndDate ? moment(props.record.ContractEndDate) : null,
            Description: props.record.Description,
            IsActive: props.record.IsActive,
        });



    }, [props.record]);

    // const onReset = () => {
    //   form.resetFields();
    // };


    const onFinish = (values) => {
        console.log("@@@@@@@@@@@@@@@@@@@", values)
        return updateCustomerApi(values, props.record.Id)
            .then((res) => {
                props.setRefresh(!props.refresh);
                openNotification("Sucessfully update customer");
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
            message: "Successfully update Customer",
            description: message,
            onClick: () => {
                console.log("Notification Clicked!");
            },
        });
    };

    return (
        <div>

            <Modal
                title="Update new Customer"
                centered
                visible={props.modalVisible}
                forceRender={true}
                footer={[
                    <Button form="myFormEdit" key="submit" type="primary" htmlType="submit" onClick={() => props.setModalVisible(false)}>
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
                <Form


                    form={form} onFinish={onFinish} name="myFormEdit" layout="vertical">
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
                            onFocus={fetchContactPoints}
                            filterOption={(input, option) =>
                                option.children
                                    .toString()
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 1
                            }
                        >
                            <Option value={contactPointId}>  {contactPointEmail} </Option>
                            {contactPoints.filter(item => item.Id != contactPointId).map((item) => (
                                <Option value={item.Id}> {item.Email} </Option>
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
                            defaultChecked={props.record.IsActive}
                        ></Switch>
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    );
}

export default EditCustomerModal;
