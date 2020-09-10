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


export const updateServerApi = (data) => {
  return new Promise((resolve, reject) => {
    console.log("Send data", data)
    return axios
      .put(`/api/servers`, {
          Id: data.id,
          Name: data.serverName,
          IpAddress: data.ipAddress,
          StartDate: data.startDate,
          EndDate: data.endDate,
          IsActive: data.status
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });  

}

export const deleteServerApi = (data) => {
  return new Promise((resolve, reject) => {
    console.log("Delete data", data)
    return axios
      .delete(`/api/servers`, {
          params: {
              id: data.id
          }
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}