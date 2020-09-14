import React, { useState } from 'react';
import { Form, Input, DatePicker, Button, Modal, Upload, message} from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { checkToken } from "utils/localstorage";
import { importServerListApi } from 'api/server';
const { Dragger } = Upload;

function ImportServer(props){
    const [fileList, setFileList] = useState([]);
    const [importFile, setImportFile] = useState(null);
    const handleChange = info => {
      let fileList = [...info.fileList];
  
      // 1. Limit the number of uploaded files
      // Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-1);
  
      // 2. Read from response and show file link
      // fileList = fileList.map(file => {
      //   if (file.response) {
      //     // Component will show file.url as link
      //     file.url = file.response.url;
      //     setImportFile(file.response.filename)
      //   }
      //   return file;
      // });
      // console.log("File list", fileList);
      setFileList( fileList );
      setImportFile(fileList[0]?fileList[0]: null);
    };

    const uploadProps = {
      name:'file',
      // onChange: (info) => {
      //     const { status } = info.file;
      //     if (status !== 'uploading') {
      //       console.log(info.file, info.fileList);
      //     }
      //     if (status === 'done') {
      //       message.success(`${info.file.name} file uploaded successfully.`);
      //     } else if (status === 'error') {
      //       message.error(`${info.file.name} file upload failed.`);
      //     }
      // },
      onChange: handleChange,
      // action:'http://localhost:5000/api/servers/import',
      multiple: false,
      // headers: {
      //   authorization: 'Bearer ' + checkToken(),
      // },
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