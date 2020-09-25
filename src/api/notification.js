import Axios from "axios";

import axios from "axios/auth.instance";

export const getAllNotifications = () => {
  return new Promise((resolve, reject) => {
    return axios
      .get("/notifications")
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const putReadNotificationApi = (id) => {
  return new Promise((resolve, reject) => {
    return axios
      .put(`/notifications/read-notification/${id}`)
      .then((res) => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
