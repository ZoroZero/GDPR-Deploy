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
/* TODO:
- Get api => contactpoints (service cua tu') => contactpointid
- create customer => promise tu backend => refetch data
- sort date




*/
