import React, { useEffect, useState } from "react";
import { Upload, Button, Avatar, message } from "antd";
import ImgCrop from "antd-img-crop";
import { checkToken } from "utils/localstorage";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { getAccountDetailApi } from "api/user";
import { setua } from "features/App/slice";
// const token = checkToken();

const UploadAvatarDynamic = (pross) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const { username, avatar } = useSelector((state) => state.app);
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
    getAccountDetailApi()
      .then((res) => {
        dispatch(setua({username: username, avatar: res.data.AvatarPath }));
        if (res.status === 200) {
          message.success(res.statusText);
        } else {
          message.error(res.statusText);
        }
      })
      .catch((error) => {
        message.error(error.data.message);
      });
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

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error('Image must smaller than 10MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  return (
    <ImgCrop beforeCrop={beforeUpload} rotate>
      <Upload
        action="http://localhost:5000/api/users/avatar"
        headers={{ Authorization: `Bearer ${token}` }}
        // listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        // onPreview={onPreview}
      >
        {fileList.length < 1 && (<Avatar size={150} style={{ padding: 0 }} src={`${process.env.REACT_APP_BASE_URL}/api/users/${avatar}`} />)}
      </Upload>
    </ImgCrop>
  );
};

export default UploadAvatarDynamic;
