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
        reject(error.response);
      });
  });
};

export const getUsersApi = (data) => {
  return new Promise((resolve, reject) => {
    const token = checkToken();
    console.log("data: ", data);
    console.log("check token get userAPI", token);
    return axios
      .get("/api/users/list", { params: data })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const getAccountDetailApi = () => {
  return new Promise((resolve, reject) => {
    const token = checkToken();
    console.log("check token get userAPI", token);
    return axios
      .get("/api/users/profile")
      .then((res) => {
        console.log("res", res);
        resolve(res);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const deleteUsersApi = (data) => {
  return new Promise((resolve, reject) => {
    return axios
      .delete("/api/users/" + data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const insertUsersApi = (data) => {
  return new Promise((resolve, reject) => {
    return axios
      .post("/api/users/insert", { ...data })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const updateUsersApi = (id, data) => {
  return new Promise((resolve, reject) => {
    console.log("id", id);
    console.log("data", data);
    return axios
      .put(`/api/users/${id}`, { ...data })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const updateAccountApi = (id, data) => {
  return new Promise((resolve, reject) => {
    console.log("id", id);
    console.log("data", data);
    return axios
      .put(`/api/users/account/${id}`, { ...data })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const forgotPasswordApi = (email) => {
  return new Promise((resolve, reject) => {
    return axios
      .get(`/api/users/forgot/${email}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
