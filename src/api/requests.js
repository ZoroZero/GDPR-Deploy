import axios from "axios/auth.instance";

export const getListRequestApi = (params = {}) => {
  //   console.log(params);
  return new Promise((resolve, reject) => {
    return axios
      .get("/api/requests", { params: params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
