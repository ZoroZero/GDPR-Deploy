import React from 'react';
import { Form, Input, DatePicker, Button } from "antd";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { setSort, setData, setPagination } from "features/ManageServer/slice";

function ExportServer(props){
    const [form] = Form.useForm();
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    function exportToCSV(csvData, fileName)  {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    function onFinish(values) {
        console.log(values);
    }

    return (
        props.visible?
        <div>
        <Form  form={form} id="myForm"  onFinish={onFinish} 
            layout="vertical">
            <Form.Item>
                <Form.Item label="Server name"  style={{ display: 'inline-block', width: 'calc(25% - 16px)', margin: '0 8px' }}
                        name='ServerName'>
                        <Input  />
                </Form.Item>

                <Form.Item label="IP Address"  style={{ display: 'inline-block', width: 'calc(25% - 16px)', margin: '0 8px' }}
                            name='IpAddress'>
                    <Input />
                </Form.Item>

                <Form.Item label="From date" style={{ display: 'inline-block', width: 'calc(25% - 16px)', margin: '0 8px'  }} 
                            name='FromDate'>
                    <DatePicker showTime  style={{  width: '100%' }}/>
                </Form.Item>

                <Form.Item label="To date" style={{ display: 'inline-block', width: 'calc(25% - 16px)', margin: '0 8px' }}
                            name='ToDAte'>
                    <DatePicker showTime style={{  width: '100%' }}/>
                     
                </Form.Item>
            </Form.Item> 

            <Form.Item>
                <Button form="myForm" key="submit" type="primary" htmlType="submit" >Filter</Button>
                <Button disabled={!props.csvData[0]} variant="warning" onClick={(e) => exportToCSV(props.csvData,props.fileName)}>Export</Button>
            </Form.Item>
        </Form>
       
        </div>:null
    )
}

export default ExportServer;