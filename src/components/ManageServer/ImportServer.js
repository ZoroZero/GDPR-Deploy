import React, { useState } from 'react';
import { Button, Modal, Upload, message} from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { importServerListApi } from 'api/server';
const { Dragger } = Upload;

function ImportServer(props){
    const [fileList, setFileList] = useState([]);
    const [importFile, setImportFile] = useState(null);

    
    const handleChange = info => {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      setFileList( fileList );
      setImportFile(fileList[0]?fileList[0]: null);
    };

    const uploadProps = {
      name:'file',
      onChange: handleChange,
      multiple: false,
      beforeUpload: () => { return false },
      accept:".xlsx, .csv"
    }

    const handleUpload = () => {
        console.log(importFile)
        if(importFile){
          return importServerListApi(
            {
                file: importFile.originFileObj
            })
          .then((res) => {
              console.log(res)
              //props.setExportData(res.data)
              // props.setLoading(false);
              // props.setTableData(res.data,res.total)
              // dispatch(setPagination({pagination: {page: 1, pageSize: res.total}}))
          }).catch((err) => {console.log(err)});
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
              <Button key="submit" type="primary" onClick={handleUpload} disabled={!importFile}>
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