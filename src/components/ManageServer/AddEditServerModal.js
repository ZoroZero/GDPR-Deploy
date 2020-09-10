import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Button, notification, Switch } from "antd";
import { createServerApi, updateServerApi } from 'api/server';
import { SERVER_CONSTANTS } from "constants/ManageServer/server";

function AddEditServerModal(props){

    const [form] = Form.useForm();
    const [title, setTitle] = useState('Create new server');
    const [active, setActive] = useState(true);
    useEffect(() => {
        form.setFieldsValue({ 
            ServerName: '',
            IpAddress: '',
            StartDate: '',
            EndDate: ''
         });

        setTitle(props.request && props.request.type === SERVER_CONSTANTS.UPDATE_SERVER_TYPE?'Update server information' : 'Creat new server')
      }, [props]);

    

    const onFinish = values => {
        // console.log(values);
        if(props.request.type === SERVER_CONSTANTS.ADD_SERVER_TYPE){
            return createServerApi({
                    serverName: values.ServerName,
                    ipAddress: values.IpAddress,
                    startDate: values.StartDate.format("YYYY-MM-DD hh:mm:ss"),
                    endDate: values.EndDate.format("YYYY-MM-DD hh:mm:ss")
                })
                .then((res) => {
                    
                    console.log("Sucessfully add new server", res)
                    openNotification("Sucessfully add new server")
                    props.setModalVisible(false)
                    form.resetFields();
                })
                .catch((err) => console.log(err)) 
                .finally(() => {
                    props.setEditRequest(null);
                    props.setRefreshPage(true);
                })   
        }
        else if(props.request.type === SERVER_CONSTANTS.UPDATE_SERVER_TYPE){
            const id = props.request.data.Id
            console.log(active);
            return updateServerApi({
                id: id,
                serverName: values.ServerName,
                ipAddress: values.IpAddress,
                startDate: values.StartDate.format("YYYY-MM-DD hh:mm:ss"),
                endDate: values.EndDate.format("YYYY-MM-DD hh:mm:ss"),
                status: active
            })
            .then((res) => {
                console.log("Sucessfully change server information", res)
                openNotification("Sucessfully change server information")
                props.setModalVisible(false)
                form.resetFields();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                props.setEditRequest(null);
                props.setRefreshPage(true);
                }
            ) 
        }
        
    };

    const openNotification = (message) => {
        notification.open({
          message: message,
          description: message,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
    };
    
    return (    
        <Modal
            title= {title}
            centered
            
            visible={props.modalVisible}
            onCancel={()=>{props.setModalVisible(false)}}
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
                    
                    {props.request && props.request.type === SERVER_CONSTANTS.UPDATE_SERVER_TYPE &&
                        <Form.Item name='Status'>
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked onChange={(checked)=>{setActive(checked)}}/>
                            <br />
                        </Form.Item>
                    }
                </Form>

                
        </Modal>)
}

export default AddEditServerModal;
