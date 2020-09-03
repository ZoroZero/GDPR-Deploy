import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:5000/api" });

instance.interceptors.request.use(
  (req) => {
    if (instance.defaults.headers.common["Authorization"]) {
      return req;
    } else {
      throw { message: "the token is not available" };
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    //applying token
    //console.log(token);
    instance.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    //deleting token
    delete instance.defaults.headers.common["Authorization"];
  }
};

export default instance;
