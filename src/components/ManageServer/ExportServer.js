import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Button, Modal,  Menu, Dropdown, Select } from "antd";
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
    const [csvData, setCSVData] = useState(null)
    const [keyword, setkeyword] = useState("");
    const fileName = SERVER_CONSTANTS.SERVER_EXPORT_FILE; 
    const { lstServer } = useSelector(
        (state) => state.serverManagement
    );
    const shouldGetData = props.visible
    useEffect(() => {
        if(shouldGetData)
            dispatch(getListServerOptions());
      }, [shouldGetData]);


    const options = lstServer.filter((value) => value.IpAddress.includes(keyword))
        .map((value, index) => {
        return (
            <Option value={value.IpAddress} key={value.IpAddress}>
            {value.IpAddress}
            </Option>
        );
    });

    function exportToXLSX(csvData, fileName, type)  {
        if(csvData.length === 0){
            csvData = [{
                Name: null,
                IpAddress: null,
                StartDate: null,
                EndDate: null,
                IsActive: null,
                CreatedBy: null,
                CreatedDate: null,
                UpdatedBy: null,
                UpdatedDate: null,
                DeletedBy: null,
                DeletedDate: null,
                IsDeleted: null
            }]
        }
        const ws = XLSX.utils.json_to_sheet(csvData.map(({OwnerId, OwnerName, ...data}) => data));
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: type, type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + '.' + type);
    }

    function onFinish(values) {
        //console.log(values);
        // props.setLoading(true);
        let filterColumn = SERVER_CONSTANTS.DEFAULT_FILTER_COLUMN
        let filterKeys = SERVER_CONSTANTS.DEFAULT_FILTER_KEYS
        if(values.Status){
            if(values.Status.includes('deleted')){
                if(values.Status.length === 1){
                    filterColumn = 'Deleted'
                }
                else{
                    filterColumn = 'Status+Deleted'
                    filterKeys = values.Status.filter(x => x !== 'deleted').join(',')
                }
            }   
            else{
                filterColumn = 'Status'
                filterKeys = values.Status.join(',')
            }
        }
        return exportServerListApi(
            {
                serverName: values.ServerName? values.ServerName.trim(): undefined,
                ipAddressList: values.IpAddress? values.IpAddress: undefined,
                startDate: values.FromDate? values.FromDate.format("YYYY-MM-DD HH:mm:ss"): undefined,
                endDate: values.ToDate? values.ToDate.format("YYYY-MM-DD HH:mm:ss"): undefined,
                filterColumn: filterColumn,
                filterKeys: filterKeys
            }
        )
        .then((res) => {
            //console.log(res)
            setCSVData(res.data)
        })
        // .catch((err) => {//console.log(err)});
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

    const statusOptions = [
        <Option value={'1'} key={'active'}>Active</Option>,
        <Option value={'0'} key={'inactive'}>Inactive</Option>,
        <Option value={'deleted'} key={'deleted'}>Deleted</Option>
    ]

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
                    <Form.Item label="Server name"  style={{ display: 'inline-block', width: 'calc(50% - 16px)', margin: '0 8px' }}
                            name='ServerName'>
                            <Input  />
                    </Form.Item>

                    <Form.Item label="IP Address"  style={{ display: 'inline-block', width: 'calc(50% - 16px)', margin: '0 8px' }}
                                name='IpAddress'>
                        <Select showSearch onSearch={onSearchServer} mode="multiple" >
                            {options}
                        </Select>
                        {/* <Input></Input> */}
                    </Form.Item>
                </Form.Item> 

                <Form.Item>
                    <Form.Item label="From date" style={{ display: 'inline-block', width: 'calc(50% - 16px)', margin: '0 8px'  }} 
                                name='FromDate'>
                        <DatePicker showTime  style={{  width: '100%' }}/>
                    </Form.Item>

                    <Form.Item label="To date" style={{ display: 'inline-block', width: 'calc(50% - 16px)', margin: '0 8px' }}
                                name='ToDate'>
                        <DatePicker showTime style={{  width: '100%' }}/>
                        
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Form.Item label="Status" name='Status' style={{ display: 'inline-block', width: 'calc(50% - 16px)', margin: '0 8px' }}>
                        <Select placeholder="Select a status" mode="multiple"  >
                            {statusOptions}
                        </Select>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button form="exportForm" key="submit" type="primary" htmlType="submit" style={{margin: '0px 8px'}}>Filter</Button>
                    <Dropdown overlay={menu} disabled={!csvData} style={{margin: '0px 8px'}}>
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