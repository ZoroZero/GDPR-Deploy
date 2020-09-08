import axios from "axios/auth.instance";
import { checkToken } from "utils/localstorage";

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
    const token = checkToken();
    console.log("check token get userAPI", token);
    return axios
      .get("/api/users", { params: data })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
