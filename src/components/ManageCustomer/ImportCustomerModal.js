import React, { useState } from 'react';
import { Button, Modal, Upload, message} from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { importServerListApi } from 'api/server';
import { setRefresh } from 'features/ManageCustomer/slice';
import { useSelector, useDispatch } from "react-redux";
import { importCustomerListApi } from 'api/customer';
import * as XLSX from 'xlsx';

const { Dragger } = Upload;

function ImportCustomerModal(props){
    const [fileList, setFileList] = useState([]);
    const [importFile, setImportFile] = useState(null);
    const [importData, setImportData] = useState([]);
    const dispatch = useDispatch();
    const { refresh } = useSelector((state) => state.customerManagement);
  
    // Handle upload file change
    const handleChange = info => {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      setFileList( fileList );
      setImportFile(fileList[0]?fileList[0]: null);
    };

    // Upload properties
    const uploadProps = {
      name:'file',
      onChange: handleChange,
      multiple: false,
      beforeUpload: () => { return false },
      accept:".xlsx, .csv"
    }

    // Handle import  
    const handleImport = () => {
        console.log(importFile)
        var importData = []
        if(importFile){
            // Read file
            var file = importFile.originFileObj
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
                // pre-process data
                var binary = "";
                var bytes = new Uint8Array(e.target.result);
                var length = bytes.byteLength;
                for (var i = 0; i < length; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                // call 'xlsx' to read the file
                var workbook = XLSX.read(binary, {type: 'binary', cellDates:true, cellStyles:true});
                var sheet_name_list = workbook.SheetNames;
                importData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {dateNF:'yyyy/mm/dd HH:mm:ss'});

                importCustomerListApi({
                    data: importData
                })
                .then((res) => {
                    console.log('Import customer res',res)
                    message.success("Successfully import server list")
                    dispatch(setRefresh())
                }).catch((err) => {
                    console.log("Import error", err)
                    message.error("Something went wrong. Please check your file again")
                });
            };
            fileReader.readAsArrayBuffer(file);
        }
        else{
            message.error(`No file chosen`);
        }
    }

    return (
        <Modal
            title= {"Import server list"}
            centered
            visible={props.visible}
            onCancel={()=>{props.setVisible(false)}}
            okButtonProps={{ style: { display: 'none' } }}
            cancelButtonProps={{ style: { display: 'none' } }}
            forceRender={true} 
            width={'70vw'}
            footer={[
              <Button key="submit" type="primary" onClick={handleImport} disabled={!importFile}>
                  Import
              </Button>
              ,
              <Button key="cancel" onClick={()=>{props.setVisible(false); setImportFile(null); setFileList([])}}>
                  Cancel
              </Button>
            ]}
            >
            <Dragger {...uploadProps} fileList={fileList}>
                <p className="ant-upload-drag-icon">
                <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
                </p>
            </Dragger>
        </Modal>
    )
}

export default ImportCustomerModal;