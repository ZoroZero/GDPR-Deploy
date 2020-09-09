import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Button, notification } from "antd";
import { createServerApi } from 'api/server';

function AddEditServerModal(props){

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({ 
            ServerName: '',
            IpAddress: '',
            StartDate: '',
            EndDate: ''
         });
      }, []);

    const onReset = () => {
        form.resetFields();
    };

    const onFinish = values => {
        console.log(values);
        // console.log(values.StartDate.format("YYYY-MM-DD hh:mm:ss")
        return createServerApi({
            serverName: values.ServerName,
            ipAddress: values.IpAddress,
            startDate: values.StartDate.format("YYYY-MM-DD hh:mm:ss"),
            endDate: values.EndDate.format("YYYY-MM-DD hh:mm:ss")
        })
        .then((res) => {
            console.log("Sucessfully add new server")
            openNotification("Sucessfully add new server")
            props.setModalVisible(false)
            form.resetFields();
        })
        .catch((err) => console.log(err))        
    };

    const openNotification = (message) => {
        notification.open({
          message: 'Successfully create server',
          description:
            message,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
    };
    
    return (    
        <Modal
            title="Create new server"
            centered
            
            visible={props.modalVisible}
            okButtonProps={{ style: { display: 'none' } }}
            cancelButtonProps={{ style: { display: 'none' } }}
            forceRender={true} 
            footer={[
                <Button form="myForm" key="submit" type="primary" htmlType="submit">
                    Submit
                </Button>
                ,
                <Button key="cancel" onClick={()=>{props.setModalVisible(false)}}>
                    Cancel
                </Button>
            ]}>
                <Form  form={form} onFinish={onFinish} id="myForm"
                    layout="vertical">

                    <Form.Item label="Server name"
                            name='ServerName'
                            rules={[{
                                    required: true,
                                    message: "Please input the name of server!"
                                }]}>
                            <Input  />
                    </Form.Item>

                    <Form.Item label="IP Address"
                                name='IpAddress'
                                rules={[{
                                    required: true,
                                    message: "Please input the ip address of server!"
                                }]}>
                        <Input />
                    </Form.Item>
                    
                    <Form.Item>
                        <Form.Item label="Start date" style={{ display: 'inline-block', width: 'calc(50% - 8px)' }} 
                                    name='StartDate'
                                    rules={[{
                                        required: true,
                                        message: "Please input the start date of server!"
                                    }]}>
                            <DatePicker showTime  style={{  width: '100%' }}/>
                        </Form.Item>

                        <Form.Item label="End date" style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                                    name='EndDate'
                                    rules={[{
                                        required: true,
                                        message: "Please input the end date of server!"
                                    }]}>
                            <DatePicker showTime style={{  width: '100%' }}/>
                        </Form.Item>
                    </Form.Item>
                </Form>

                
        </Modal>)
}

export default AddEditServerModal;
