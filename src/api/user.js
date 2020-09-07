import axios from "axios/auth.instance";

export const listUserApi = () => {
  return new Promise((resolve, reject) => {
    return axios({
      method: "get",
      url: "/unknown",
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getUsersApi = (data) => {
  return new Promise((resolve, reject) => {
    return axios
      .get("/api/users/list", { params: data })
      .then((res) => {
        // console.log(Request);
        console.log(res.data);
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
