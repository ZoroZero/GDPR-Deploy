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
        const token = checkToken()
        return axios
            .get(
                String(process.env.REACT_APP_BASE_URL) + "/customers", { params: data })
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
        const token = checkToken()
        return axios
            .post(
                String(process.env.REACT_APP_BASE_URL) + "/customers", data)
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
        const token = checkToken()
        return axios
            .get(
                String(process.env.REACT_APP_BASE_URL) + "/customers/contactPoints")
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
        const token = checkToken()
        return axios
            .delete(
                String(process.env.REACT_APP_BASE_URL) + "/customers", { params: data })
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
        const token = checkToken()
        return axios
            .put(
                String(process.env.REACT_APP_BASE_URL) + "/customers" + `?Id=${id}`, newData)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getServersCustomerApi = (id) => {
    return new Promise((resolve, reject) => {
        console.log(id)
        const token = checkToken();
        return axios
            .get(
                String(process.env.REACT_APP_BASE_URL) + "/customers/servers", { params: { Id: id } }
            ).then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}


export const getOtherServersApi = (option, id) => {
    return new Promise((resolve, reject) => {
        console.log("option", option)
        const token = checkToken();
        return axios
            .get(
                String(process.env.REACT_APP_BASE_URL) + "/customers/other-servers", { params: { ...option, id: id } }
            ).then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const exportCustomerListApi = (data) => {
    return new Promise((resolve, reject) => {
        console.log("Data for export", data);
        return axios
          .get(`/customers/export`, {
              params: {
                CustomerName: data.customerName,
                ContactPoint: data.contactPoint,
                ContractBeginDate: data.startDate,
                ContractEndDate: data.endDate,
                IsActive: data.status
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

export const importCustomerListApi = ( data ) => {
    console.log('Data for import', data);
    
    return new Promise((resolve, reject) => {
        return axios
        .post(`/customers/import`, {
            CustomerList: data.data
        })
        .then((res) => {
            resolve(res.data);
        })
        .catch((error) => {
            reject(error);
        });
    }); 
}