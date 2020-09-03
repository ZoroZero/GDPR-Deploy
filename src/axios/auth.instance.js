import axios from "axios";

const instance = axios.create({ baseURL: "https://reqres.in/api" });

instance.interceptors.request.use(
  (req) => {
    if (axios.defaults.headers.common["Authorization"]) return req;
    throw { message: "the token is not available" };
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const fallbackValue = [
      {
        userId: "Not authorized",
        id: "aerw15311sq",
        title: "Please try again",
        completed: false,
      },
    ];
    return Promise.reject(fallbackValue);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    //applying token
    instance.defaults.headers.common["Authorization"] = token;
  } else {
    //deleting token
    delete instance.defaults.headers.common["Authorization"];
  }
};

export default instance;
