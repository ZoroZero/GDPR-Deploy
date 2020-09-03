import axios from "axios";

export const loginApi = (email, password) => {
  return new Promise((resolve, reject) => {
    return axios
      .post("https://reqres.in/api/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
