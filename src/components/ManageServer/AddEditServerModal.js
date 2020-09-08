import React, { useEffect, useState } from "react";
import { Modal, Radio, Form, Input, Select, DatePicker, Button} from "antd";
import { createServerApi } from 'api/server';

function AddEditServerModal(props){

    // onSubmit = () => {
    //     let serverName = 
    // }
    const onFinish = values => {
        console.log(values);
      };
    
    return (    
        <Modal
            title="Create new server"
            centered
            visible={props.modalVisible}>
            {/* // onOk={() => props.setModalVisible(false)}
            
            // onCancel={() => props.setModalVisible(false)}> */}
                <Form  onFinish={onFinish}
                    layout="vertical">

                    <Form.Item label="Server name"
                            rules={[{
                                    required: true,
                                    message: "Please input the name of server!"
                                }]}
                            ><Input  />
                    </Form.Item>

                    <Form.Item label="IP Address">
                        <Input />
                    </Form.Item>
                    
                    <Form.Item>
                        <Form.Item label="Start date" style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
                            <DatePicker style={{  width: '100%' }}/>
                        </Form.Item>

                        <Form.Item label="End date" style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}>
                            <DatePicker style={{  width: '100%' }}/>
                        </Form.Item>
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

                
        </Modal>)
}

export default AddEditServerModal;
