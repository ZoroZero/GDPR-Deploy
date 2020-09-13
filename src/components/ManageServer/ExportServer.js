import React from 'react';
import { Form, Input, DatePicker, Button, Modal } from "antd";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { exportServerListApi } from 'api/server';
// import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';

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
        // props.setLoading(true);
        return exportServerListApi(
            {
                serverName: values.ServerName,
                ipAddress: values.IpAddress,
                startDate: values.FromDate? values.FromDate.format("YYYY-MM-DD hh:mm:ss"): undefined,
                endDate: values.ToDate? values.ToDate.format("YYYY-MM-DD hh:mm:ss"): undefined
            }
        )
        .then((res) => {
            console.log(res)
            props.setExportData(res.data)
            // props.setLoading(false);
            // props.setTableData(res.data,res.total)
            // dispatch(setPagination({pagination: {page: 1, pageSize: res.total}}))
        }).catch((err) => {console.log(err)});


    }

    return (
        <Modal
            title= {"Export server list"}
            centered
            
            visible={props.visible}
            onCancel={()=>{props.setVisible(false); props.setExportData([])}}
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
                        <Input />
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
                    <Button form="exportForm" key="submit" type="primary" htmlType="submit" >Filter</Button>
                    <Button disabled={!props.csvData[0]} variant="warning" onClick={(e) => exportToCSV(props.csvData,props.fileName)}>Export</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ExportServer;