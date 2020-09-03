import axios from "axios/auth.instance";

export const loginApi = (username, password) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(
        "/auth/login",
        {
          username: username,
          password: password,
        },
        { headers: { "Access-Control-Allow-Origin": "*" } }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
