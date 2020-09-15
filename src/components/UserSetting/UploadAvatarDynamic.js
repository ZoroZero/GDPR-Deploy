import React, { useEffect, useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { checkToken } from "utils/localstorage";
import { useSelector } from "react-redux";

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

  useEffect(() => {
    const tokens = checkToken();
    setToken(tokens);
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
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 1 && "Change Avatar"}
      </Upload>
    </ImgCrop>
  );
};

export default UploadAvatarDynamic;
