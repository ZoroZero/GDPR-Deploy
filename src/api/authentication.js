import axios from "axios/auth.instance";

export const loginApi = (username, password) => {
  return new Promise((resolve, reject) => {
    return axios
      .post("/api/login", {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
