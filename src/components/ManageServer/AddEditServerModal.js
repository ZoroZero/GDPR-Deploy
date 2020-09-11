import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Button, notification, Switch } from "antd";
import { createServerApi, updateServerApi } from 'api/server';
import { SERVER_CONSTANTS } from "constants/ManageServer/server";
import moment from 'moment';

function AddEditServerModal(props){

    const [form] = Form.useForm();
    const [title, setTitle] = useState('Create new server');
    const [active, setActive] = useState(true);

    useEffect(() => {
        console.log("Request", props.request);
        form.setFieldsValue({ 
            ServerName: '',
            IpAddress: '',
            StartDate: '',
            EndDate: ''
         });

        setTitle(props.request && props.request.type === SERVER_CONSTANTS.UPDATE_SERVER_TYPE?'Update server information' : 'Creat new server')
        if(props.request && props.request.data)
            onFill()
      }, [props.request]);

    const onFill = () => {
        console.log(props)
        form.setFieldsValue({
            ServerName: props.request.data.Name,
            IpAddress: props.request.data.IpAddress,
            StartDate: moment(props.request.data.StartDate),
            EndDate: moment(props.request.data.EndDate)
        });

        setActive(props.request.data.Status === '1')
    };

    const onFinish = values => {
        console.log(values);
        if(props.request.type === SERVER_CONSTANTS.ADD_SERVER_TYPE){
            return createServerApi({
                    serverName: values.ServerName,
                    ipAddress: values.IpAddress,
                    startDate: values.StartDate.format("YYYY-MM-DD hh:mm:ss"),
                    endDate: values.EndDate.format("YYYY-MM-DD hh:mm:ss")
                })
                .then((res) => {
                    console.log("Sucessfully add new server", res)
                    openNotification(`Sucessfully add new server at ${res.createAt}`)
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
                console.log("Sucessfully update server information", res)
                openNotification(`Sucessfully update server information at ${res.updateAt}`)
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
          description: null,
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
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" checked={active} onChange={(checked)=>{setActive(checked)}}/>
                            <br />
                        </Form.Item>
                    }
                </Form>

                
        </Modal>)
}

export default AddEditServerModal;
