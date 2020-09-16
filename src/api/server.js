import axios from "axios/auth.instance";
const FormData = require('form-data');

export const getAllServerApi = () => {
  return new Promise((resolve, reject) => {
    return axios({
      method: "get",
      url: "/api/servers/all",
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
              keyword: data.keyword,
              filterColumn: data.filterColumn,
              filterKeys: data.filterKeys
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

export const updateMultipleStatusApi = (data) => {
  return new Promise((resolve, reject) => {
    console.log("Send data", data)
    return axios
      .put(`/api/servers/multi`, {
          status: data.status,
          listServer: data.listServer
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });  
}


export const exportServerListApi = (data) => {
  return new Promise((resolve, reject) => {
    console.log("Data for export", data);
    return axios
      .get(`/api/servers/export`, {
          params: {
            serverName: data.serverName,
            serverIp: data.ipAddress,
            startDate: data.startDate,
            endDate: data.endDate
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

export const importServerListApi = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    return axios
      .post(`/api/servers/import`, {
        listServer : data.data
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  }); 
}