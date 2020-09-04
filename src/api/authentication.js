import axios from "axios/auth.instance";

export const loginApi = (username, password) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(
<<<<<<< HEAD
        "/auth/login",
=======
        String(process.env.BASE_HOST) + "/auth/login",
>>>>>>> 96d40f9... add self env
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
