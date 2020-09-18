import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Button, Modal,  Menu, Dropdown, message, Select } from "antd";
import { DownOutlined } from '@ant-design/icons';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { VerticalAlignBottomOutlined } from '@ant-design/icons'
import { exportCustomerListApi } from 'api/customer';
import { useSelector, useDispatch } from "react-redux";
import { getContactPointList } from "features/ManageCustomer/slice";
import { GLOBAL_CONSTANTS } from 'constants/global';
// import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;

function ExportCustomerModal(props){
    const [form] = Form.useForm();
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    // const fileExtension = '.xlsx';
    const [csvData, setCSVData] = useState(null)
    const fileName= GLOBAL_CONSTANTS.CUSTOMER_EXPORT_FILE 
    const dispatch = useDispatch();
    const { contactPoints } = useSelector(
        (state) => state.customerManagement
    );

    useEffect(() => {
        if (props.visible) {
          form.setFieldsValue({
            Name: "",
            ContractBeginDate: null,
            ContractEndDate: null,
            Status: ['1']
          });
          dispatch(getContactPointList());
        }
      }, [props.visible]);

    function exportToXLSX(csvData, fileName, type)  {
        if(csvData){
            if(csvData.length === 0){
                csvData = [{
                    FirstName: null,
                    LastName:null,
                    ContactPointEmail: null,
                    ContactPointId: null,
                    ContractBeginDate:null,
                    ContractEndDate: null,
                    Description: null,
                    IsActive: null,
                    ContactPointStatus: null,
                    CreatedBy:null,
                    CreatedDate: null,
                    UpdatedBy:null,
                    UpdatedDate: null,
                    DeletedBy:null,
                    DeletedDate: null,
                    IsDeleted: null,
                    Total: null,
                }]
            }
            const ws = XLSX.utils.json_to_sheet(csvData);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: type, type: 'array' });
            const data = new Blob([excelBuffer], {type: fileType});
            FileSaver.saveAs(data, fileName + '.' + type);
        }
    }

    function onFinish(values) {
        console.log(values);
        // props.setLoading(true);
        if(values.Status.length === 0){
            message.error("Please select a status")
            return
        }
        return exportCustomerListApi(
            {
                customerName: values.Name.trim(),
                contactPoint: values.ContactPoint,
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
        handleExport(e.key);
    }

    const statusOptions = [
        <Option value={'1'} key={'active'}>Active</Option>,
        <Option value={'0'} key={'inactive'}>Inactive</Option>
    ]

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
            onCancel={()=>{props.setVisible(false); setCSVData(null)}}
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
                         <Select
                            showSearch
                            placeholder="Select a contact point"
                            optionFilterProp="children"
                            mode="multiple"
                            filterOption={(input, option) =>
                            option.children
                                .toString()
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 1
                            }>
                            {contactPoints.length > 0 &&
                            contactPoints.map((item) => (
                                <Option key={item.Id}> {item.Email} </Option>
                            ))}
                            
                        </Select>
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

                <Form.Item label="Status" style={{margin: '0px 8px 8px 8px' }}
                                name='Status'>
                        {/* <Checkbox.Group options={statusOptions} defaultValue={['1']} onChange={onChange}/> */}
                        <Select placeholder="Select a status" mode="multiple" style={{ display: 'inline-block', width: 'calc(50% - 16px)', margin: '0 8px'  }} >
                                {statusOptions}
                        </Select>
                </Form.Item>
                
                <Form.Item>
                    <Button form="exportForm" key="submit" type="primary" htmlType="submit" style={{margin: '0px 8px 0px 0px'}}>Filter</Button>
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