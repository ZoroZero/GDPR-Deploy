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

export const createRequestApi = (data) => {
  return new Promise((resolve, reject) => {
    return axios
      .post("/api/requests", data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getServerOptionsApi = () => {
  return new Promise((resolve, reject) => {
    return axios
      .get("/api/servers/active")
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const approveRequestApi = (value) => {
  return new Promise((resolve, reject) => {
    return axios
      .post("/api/approve-requests", value)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
