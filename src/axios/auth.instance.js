import axios from "axios";
import { checkToken } from "utils/localstorage";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.interceptors.request.use(
  (req) => {
    const token = checkToken();
    console.log("token", token);
    req.headers.Authorization = "Bearer" + token;
    return req;
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

export default instance;
