import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Button, Modal,  Menu, Dropdown, message, Select } from "antd";
import { DownOutlined } from '@ant-design/icons';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { exportServerListApi } from 'api/server';
import { SERVER_CONSTANTS } from 'constants/ManageServer/server';
import { VerticalAlignBottomOutlined } from '@ant-design/icons'
import { getListServerOptions } from "features/ManageServer/slice";
import { useDispatch, useSelector } from "react-redux";
const { Option } = Select;

function ExportServer(props){ 
    
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    // const fileExtension = '.xlsx';
    const [csvData, setCSVData] = useState([])
    const [keyword, setkeyword] = useState("");
    const fileName = SERVER_CONSTANTS.SERVER_EXPORT_FILE; 
    const { lstServer } = useSelector(
        (state) => state.serverManagement
    );
    useEffect(() => {
        dispatch(getListServerOptions());
      }, []);


    const options = lstServer.filter((value) => value.IpAddress.includes(keyword))
        .map((value, index) => {
        return (
            <Option value={value.IpAddress} key={value.IpAddress}>
            {value.IpAddress}
            </Option>
        );
    });

    function exportToXLSX(csvData, fileName, type)  {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: type, type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + '.' + type);
    }

    function onFinish(values) {
        console.log(values);
        // props.setLoading(true);
        return exportServerListApi(
            {
                serverName: values.ServerName,
                ipAddressList: values.IpAddress? values.IpAddress.join(','): undefined,
                startDate: values.FromDate? values.FromDate.format("YYYY-MM-DD hh:mm:ss"): undefined,
                endDate: values.ToDate? values.ToDate.format("YYYY-MM-DD hh:mm:ss"): undefined
            }
        )
        .then((res) => {
            console.log(res)
            setCSVData(res.data)
            // props.setLoading(false);
            // props.setTableData(res.data,res.total)
            // dispatch(setPagination({pagination: {page: 1, pageSize: res.total}}))
        }).catch((err) => {console.log(err)});
    }

    const handleExport = (type) => {
        exportToXLSX(csvData, fileName, type);
        // props.setVisible(false);
    }

    const handleMenuClick = (e) => {
        handleExport(e.key);
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="csv">
                <VerticalAlignBottomOutlined /> .CSV 
            </Menu.Item>
            <Menu.Item key="xlsx">
                <VerticalAlignBottomOutlined /> .XLSX
            </Menu.Item>
        </Menu>
    );

    
    function onSearchServer(value) {
        setkeyword(value);
    }

    return (
        <Modal
            title= {"Export server list"}
            centered     
            visible={props.visible}
            onCancel={()=>{props.setVisible(false);}}
            okButtonProps={{ style: { display: 'none' } }}
            cancelButtonProps={{ style: { display: 'none' } }}
            forceRender={true} 
            width={'70vw'}>
            <Form  form={form} id="exportForm"  onFinish={onFinish} 
                layout="vertical">
                <Form.Item>
                    <Form.Item label="Server name"  style={{ display: 'inline-block', width: 'calc(25% - 16px)', margin: '0 8px' }}
                            name='ServerName'>
                            <Input  />
                    </Form.Item>

                    <Form.Item label="IP Address"  style={{ display: 'inline-block', width: 'calc(25% - 16px)', margin: '0 8px' }}
                                name='IpAddress'>
                        <Select showSearch onSearch={onSearchServer} mode="multiple" >
                            {options}
                        </Select>
                        {/* <Input></Input> */}
                    </Form.Item>

                    <Form.Item label="From date" style={{ display: 'inline-block', width: 'calc(25% - 16px)', margin: '0 8px'  }} 
                                name='FromDate'>
                        <DatePicker showTime  style={{  width: '100%' }}/>
                    </Form.Item>

                    <Form.Item label="To date" style={{ display: 'inline-block', width: 'calc(25% - 16px)', margin: '0 8px' }}
                                name='ToDate'>
                        <DatePicker showTime style={{  width: '100%' }}/>
                        
                    </Form.Item>
                </Form.Item> 

                <Form.Item>
                    <Button form="exportForm" key="submit" type="primary" htmlType="submit" style={{margin: '0px 8px'}}>Filter</Button>
                    {/* <Button disabled={!props.csvData[0]} variant="warning" onClick={handleExport}>Export</Button> */}
                    <Dropdown overlay={menu} disabled={!csvData[0]} style={{margin: '0px 8px'}}>
                        <Button>
                            <VerticalAlignBottomOutlined /> Export <DownOutlined />
                        </Button>
                    </Dropdown>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ExportServer;