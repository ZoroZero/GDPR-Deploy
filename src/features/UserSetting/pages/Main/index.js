import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import "./index.scss";
import UserSetting from "../../../../components/UserSetting/UserSettingForm.js";
import { getAccountDetailApi } from "api/user";
import { useSelector, useDispatch } from "react-redux";
import { setRecord } from "../../slice";

MainPage.propTypes = {};
const { confirm } = Modal;

function MainPage() {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const { record } = useSelector((state) => state.userSetting);
  useEffect(() => {
    refetch();
  }, []);

  function refetch() {
    fetch();
  }
  var newdata;
  const fetch = () => {
    setLoading(true);
    return getAccountDetailApi()
      .then((res) => {
        setLoading(false);
        setData({ data: res.data });
        dispatch(setRecord({ record: res.data }));
        console.log("set data: ", res.data);
        newdata = res.data;
        if (res.status === 200) {
          // message.success(res.statusText);
        } else {
          message.error(res.statusText);
        }
      })
      .catch((error) => {
        message.error(error.data.message);
      });
  };

  return (
    <div>
      <UserSetting onSubmitModal={refetch} />
    </div>
  );
}

export default MainPage;
