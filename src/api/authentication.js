import axios from "axios/auth.instance";

export const loginApi = (username, password) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(
        String(process.env.REACT_APP_BASE_URL) + "/auth/login",

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
