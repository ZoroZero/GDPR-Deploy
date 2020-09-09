import axios from "axios/auth.instance";

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
        reject(error);
      });
  });
};

export const getUsersApi = (data) => {
  return new Promise((resolve, reject) => {
    return axios
      .get("/api/users/list", { params: data })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
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
        reject(error);
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
        reject(error);
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
        reject(error);
      });
  });
};
