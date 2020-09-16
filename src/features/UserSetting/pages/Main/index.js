import React, { useEffect, useState } from "react";
import { message } from "antd";
import "./index.scss";
import UserSetting from "../../../../components/UserSetting/UserSettingForm.js";
import { getAccountDetailApi } from "api/user";
import { useSelector, useDispatch } from "react-redux";
import { setRecord } from "../../slice";

MainPage.propTypes = {};

function MainPage() {
  const dispatch = useDispatch();
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
        dispatch(setRecord({ record: res.data }));
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
