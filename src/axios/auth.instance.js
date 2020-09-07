import axios from "axios";
import { checkToken } from "utils/localstorage";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

instance.interceptors.request.use(
  (req) => {
    const token = checkToken();
    instance.defaults.headers.common["Authorization"] = "Bearer " + token;
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
