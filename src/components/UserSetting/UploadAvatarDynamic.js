import React, { useEffect, useState } from "react";
import { Upload, Button } from "antd";
import ImgCrop from "antd-img-crop";
import { checkToken } from "utils/localstorage";
import { useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";

// const token = checkToken();

const UploadAvatarDynamic = (pross) => {
  const [token, setToken] = useState("");
  const [fileList, setFileList] = useState([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
  ]);
  // const sleep = (milliseconds) => {
  //   return new Promise((resolve) => setTimeout(resolve, milliseconds));
  // };
  useEffect(() => {
    const tokens = checkToken();
    setToken(tokens);
    // await sleep(500);
    pross.onsub();
  }, []);
  const onChange = ({ fileList: newFileList }) => {
    // setFileList(newFileList);
    console.log(`Bearer ${token}`);
    pross.onsub();
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotate>
      <Upload
        action="http://localhost:5000/api/users/avatar"
        headers={{ Authorization: `Bearer ${token}` }}
        // listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 1 && (
          <Button icon={<UploadOutlined />}>Upload Avatar</Button>
        )}
      </Upload>
    </ImgCrop>
  );
};

export default UploadAvatarDynamic;
