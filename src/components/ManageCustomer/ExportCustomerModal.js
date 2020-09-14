import React, { useState } from 'react';
import { Form, Input, DatePicker, Button, Modal,  Menu, Dropdown, message, Select, Checkbox } from "antd";
import { DownOutlined } from '@ant-design/icons';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { SERVER_CONSTANTS } from 'constants/ManageServer/server';
import { VerticalAlignBottomOutlined } from '@ant-design/icons'
import { exportCustomerListApi } from 'api/customer';
// import { useDispatch, useSelector } from "react-redux";
function ExportCustomerModal(props){
    const [form] = Form.useForm();
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    // const fileExtension = '.xlsx';
    const [csvData, setCSVData] = useState([])
    const fileName= SERVER_CONSTANTS.SERVER_EXPORT_FILE 


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
        return exportCustomerListApi(
            {
                customerName: values.Name,
                contactPointEmail: values.ContactPoint,
                startDate: values.StartDate? values.StartDate.format("YYYY-MM-DD hh:mm:ss"): undefined,
                endDate: values.EndDate? values.EndDate.format("YYYY-MM-DD hh:mm:ss"): undefined,
                status: values.Status.join(',')
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
        // message.info('Click on menu item.');
        // console.log('click', e);
        handleExport(e.key);
    }

    const statusOptions = [
        { label: 'Active', value: '1' },
        { label: 'Inactive', value: '0' },
      ];
    
    function onChange(checkedValues) {
        console.log('checked = ', checkedValues);
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
          {/* <Menu.Item key="csv">
            <CSVLink data={csvData} filename={fileName + '.csv'}>.CSV</CSVLink>
          </Menu.Item> */}
            <Menu.Item key="csv">
                <VerticalAlignBottomOutlined /> .CSV 
            </Menu.Item>
            <Menu.Item key="xlsx">
                <VerticalAlignBottomOutlined /> .XLSX
            </Menu.Item>
        </Menu>
    );


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
                    <Form.Item label="Customer name"  style={{ display: 'inline-block', width: 'calc(50% - 16px)', margin: '0 8px' }}
                        name='Name'>
                        <Input  />
                    </Form.Item>

                    <Form.Item label="Contact point"  style={{ display: 'inline-block', width: 'calc(50% - 16px)', margin: '0 8px' }}
                        name='ContactPoint'>
                        <Input />
                    </Form.Item>
                </Form.Item> 

                <Form.Item>
                    <Form.Item label="Contract from date" style={{ display: 'inline-block', width: 'calc(50% - 16px)', margin: '0 8px'  }} 
                                name='StartDate'>
                        <DatePicker showTime  style={{  width: '100%' }}/>
                    </Form.Item>

                    <Form.Item label="Contract to date" style={{ display: 'inline-block', width: 'calc(50% - 16px)', margin: '0 8px' }}
                                name='EndDate'>
                        <DatePicker showTime style={{  width: '100%' }}/>
                    </Form.Item>
                </Form.Item>

                <Form.Item label="Status" style={{ display: 'inline-block', margin: '0px 8px 8px 8px' }}
                                name='Status'>
                        <Checkbox.Group options={statusOptions} defaultValue={['Active']} onChange={onChange}/>
                </Form.Item>
                
                <Form.Item>
                    <Button form="exportForm" key="submit" type="primary" htmlType="submit" style={{margin: '0px 8px'}}>Filter</Button>
                    {/* <Button disabled={!props.csvData[0]} variant="warning" onClick={handleExport}>Export</Button> */}
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

export default ExportCustomerModal;