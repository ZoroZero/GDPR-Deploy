import axios from "axios/auth.instance";

export const listServerApi = () => {
  return new Promise((resolve, reject) => {
    return axios({
      method: "get",
      url: "/api/servers",
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getServersApi = (data) => {
  return new Promise((resolve, reject) => {
    return axios
      .get(`/api/servers`, {
          params: {
              pageNumber: data.current,
              pageSize: data.pageSize,
              sortColumn: data.sortColumn,
              sortOrder: data.sortOrder,
              keyword: data.keyword
          }
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


export const createServerApi = (data) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(`/api/servers`, {
          serverName: data.serverName,
          ipAddress: data.ipAddress,
          startDate: data.startDate,
          endDate: data.endDate
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  }); 
}