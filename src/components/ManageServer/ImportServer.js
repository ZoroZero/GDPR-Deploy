import React from 'react';
import { Form, Input, DatePicker, Button, Modal, Upload, message} from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { checkToken } from "utils/localstorage";
const { Dragger } = Upload;

function ImportServer(props){
    const uploadProps = {
      name:'file',
      onChange: (info) => {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      action:'http://localhost:5000/api/servers/import',
      multiple: false,
      headers: {
        authorization: 'Bearer ' + checkToken(),
      },
    }

    const handleUpload = () => {
      
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
              <Button key="submit" type="primary" onClick={handleUpload}>
                  Import
              </Button>
              ,
              <Button key="cancel" onClick={()=>{props.setVisible(false)}}>
                  Cancel
              </Button>
            ]}
            >
            <Dragger {...uploadProps}>
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