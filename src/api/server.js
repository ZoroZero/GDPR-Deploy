import axios from "axios/auth.instance";

export const listServerApi = () => {
  return new Promise((resolve, reject) => {
    return axios({
      method: "get",
      url: "/api/servers",
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getServersApi = (data) => {
  return new Promise((resolve, reject) => {
    return axios
      .get(`/api/servers`, {
          params: {
              current: data.current,
              pageSize: data.pageSize
          }
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
