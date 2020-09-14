import React, { useState } from 'react';
import { Button, Modal, Upload, message} from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { importServerListApi } from 'api/server';
const { Dragger } = Upload;

function ImportServer(props){
    const [fileList, setFileList] = useState([]);
    const [importFile, setImportFile] = useState(null);

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
        if(importFile){
          return importServerListApi(
            {
                file: importFile.originFileObj
            })
          .then((res) => {
              console.log(res)
              message.success("Successfully import server list")
              props.setRefreshPage(true)
          }).catch((err) => {
            console.log("Import error", err)
            message.error("Something went wrong. Please check your file again")
          });
        }
        message.error(`No file chosen`);
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

export default ImportServer;