import axios from "axios/auth.instance";
import { checkToken } from "utils/localstorage";

export const listCustomerApi = () => {
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
export const getCustomerApi = (data) => {
  return new Promise((resolve, reject) => {
    const token = checkToken();
    return axios
      .get("/customers", {
        params: data,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createCustomerApi = (data) => {
  return new Promise((resolve, reject) => {
    const token = checkToken();
    return axios
      .post("/customers", data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getContactPointsApi = () => {
  return new Promise((resolve, reject) => {
    const token = checkToken();
    return axios
      .get("/customers/contactPoints")
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteCustomerApi = (data) => {
  return new Promise((resolve, reject) => {
    const token = checkToken();
    return axios
      .delete("/customers", {
        params: data,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateCustomerApi = (newData, id) => {
  return new Promise((resolve, reject) => {
    const token = checkToken();
    return axios
      .put(
        "/customers" + `?Id=${id}`,
        newData
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getServersCustomerApi = (id, keyword) => {
  return new Promise((resolve, reject) => {
    console.log(id);
    const token = checkToken();
    return axios
      .get("/customers/servers", {
        params: { Id: id, keyword: keyword },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getOtherServersApi = (option, id, page, keyword) => {
  return new Promise((resolve, reject) => {
    const token = checkToken();
    return axios
      .get(
        "/customers/other-servers",
        { params: { ...option, id: id, page: page, keyword: keyword } }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteServersOfCustomerApi = (deletedServers, customerId) => {

  return new Promise((resolve, reject) => {
    const token = checkToken();
    return axios
      .put(
        "/customers/servers" + `?Id=${customerId}`,
        { params: { DeletedServers: deletedServers } }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


export const addServersForCustomerApi = (addedServers, customerId) => {

  return new Promise((resolve, reject) => {
    const token = checkToken();
    return axios
      .post(
        "/customers/servers" + `?Id=${customerId}`,
        { params: { AddedServers: addedServers } }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

