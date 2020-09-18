import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Button, Switch, message } from "antd";
import { createServerApi, updateServerApi } from 'api/server';
import { SERVER_CONSTANTS } from "constants/ManageServer/server";
import { GLOBAL_CONSTANTS } from 'constants/global'
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from 'features/ManageServer/slice';
// import { getDefaultErrorMessage } from "@casl/ability";
const { RangePicker } = DatePicker;


function AddEditServerModal(props) {
    const { refresh } = useSelector((state) => state.serverManagement)
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const [title, setTitle] = useState('Create new server');
    const [active, setActive] = useState(true);
    const shouldGetData = props.modalVisible !== false;
    useEffect(() => {
        if(shouldGetData){
            console.log("Request", props.request);
            form.setFieldsValue({ 
                ServerName: null,
                IpAddress: null,
                Time: [null, null],
            });

            setTitle(props.request && props.request.type === SERVER_CONSTANTS.UPDATE_SERVER_TYPE?'Update server information' : 'Creat new server')
            if(props.request && props.request.data){
                onFill()
            }
        }
      }, [shouldGetData]);

    const onFill = () => {
        console.log(props)
        form.setFieldsValue({
            ServerName: props.request.data.Name,
            IpAddress: props.request.data.IpAddress,
            Time: [moment(props.request.data.StartDate, GLOBAL_CONSTANTS.TIME_FORMAT), moment(props.request.data.EndDate, GLOBAL_CONSTANTS.TIME_FORMAT)]
        });

        setActive(props.request.data.IsActive)
    };

    const handleClose = () => {
        props.setEditRequest(null);
        props.setModalVisible(false);
    }

    const onFinish = values => {
        console.log(values);
        if(props.request.type === SERVER_CONSTANTS.ADD_SERVER_TYPE){
            return createServerApi({
                    serverName: values.ServerName.trim(),
                    ipAddress: values.IpAddress,
                    startDate: values.Time[0].format(GLOBAL_CONSTANTS.TIME_FORMAT),
                    endDate: values.Time[1].format(GLOBAL_CONSTANTS.TIME_FORMAT)
                })
                .then((res) => {
                    console.log("Sucessfully add new server", res)
                    message.success("Sucessfully add new server")
                    // openNotification(`Sucessfully add new server at ${res.createAt}`)
                    props.setModalVisible(false)
                    form.resetFields()
                    dispatch(setRefresh(!refresh));
                })
                .catch((err) => {
                    console.log("Add error", err); 
                    message.error("Something went wrong.\nYour server name or ip is already existed. Please check again")
                }) 
        }
        else if(props.request.type === SERVER_CONSTANTS.UPDATE_SERVER_TYPE){
            const id = props.request.data.Id
            console.log(active);
            return updateServerApi({
                id: id,
                serverName: values.ServerName.trim(),
                ipAddress: values.IpAddress,
                startDate: values.Time[0].format(GLOBAL_CONSTANTS.TIME_FORMAT),
                endDate: values.Time[1].format(GLOBAL_CONSTANTS.TIME_FORMAT),
                status: active
            })
            .then((res) => {
                console.log("Sucessfully update server information", res)
                // openNotification(`Sucessfully update server information at ${res.updateAt}`)
                message.success("Successfully update server information")
                props.setModalVisible(false)
                form.resetFields();
                dispatch(setRefresh(!refresh));
            })
            .catch((err) => {
                console.log("Update error", err); 
                message.error("Something went wrong.\nYour server name or ip is already existed. Please check again")
            })
        }
    };
    
    function range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
    }

    function disabledDate(current) {
        // Can not select days before today
        return current && current < moment().subtract(1, 'day').endOf('day');
    }

    return (    
        <Modal
            title= {title}
            centered
            visible={props.modalVisible}
            onCancel={handleClose}
            okButtonProps={{ style: { display: 'none' } }}
            cancelButtonProps={{ style: { display: 'none' } }}
            forceRender={true} 
            footer={[
                <Button form="myForm" key="submit" type="primary" htmlType="submit">
                    Submit
                </Button>,
                <Button key="cancel" onClick={handleClose}>
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
                                rules={[
                                    {required: true,message: "Please input the ip address of server!"},
                                    {pattern: "^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$", message: "Ip format is not correct"}]}>
                        <Input />
                    </Form.Item>
                    
                    <Form.Item name='Time' label='Time' rules={[
                                    {required: true,message: "Please input the ip address of server!"} ]} style={{ display: 'inline-block', width: "100%", height: 'auto'}}>
                        {/* <Form.Item label="Start date" style={{ display: 'inline-block', width: 'calc(50% - 8px)' }} 
                                    name='StartDate'
                                    rules={[{
                                        required: true,
                                        message: "Please input the start date of server!"
                                    }]}>
                            <DatePicker showTime  disabledDate={d => !d || d.isBefore(moment().format('YYYY-MM-DD HH:mm:ss'))} style={{  width: '100%' }}/>
                        </Form.Item>

                        <Form.Item label="End date" style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                                    name='EndDate'
                                    rules={[{
                                        required: true,
                                        message: "Please input the end date of server!"
                                    }]}>
                            <DatePicker showTime disabledDate={d => !d || d.isBefore(moment().format('YYYY-MM-DD HH:mm:ss'))} style={{  width: '100%' }}/>
                        </Form.Item> */}
                        <RangePicker
                            showTime 
                            disabledDate={disabledDate}
                            format="YYYY-MM-DD HH:mm:ss"
                            style={{ width: "100%"}}/>
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
