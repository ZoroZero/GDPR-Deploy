import { createSlice } from "@reduxjs/toolkit";
import {
  getContactPointsApi,
  getCustomerApi,
  getServersCustomerApi,
  getOtherServersApi,
  deleteServersOfCustomerApi,
  addServersForCustomerApi,
} from "api/customer";

export const initialState = {
  data: [],
  deletedData: [],
  servers: [],
  otherServers: { data: [], loading: false, hasMore: true },
  pagination: {
    total: 0,
    current: 1,
    pageSize: 10,
  },
  deletedOwnedServers: [],
  addedServers: [],
  sortColumn: "CreatedDate",
  sortOrder: "descend",
  keyword: "",
  filterValue: [],
  refresh: false,
  contactPoints: [],
  loading: false,
};

const slice = createSlice({
  name: "customerManagement",
  initialState,

  reducers: {

    setData: (state, action) => {
      console.log("SET DATA", action.payload);
      state.data = action.payload;
    },

    setPagination: (state, action) => {
      console.log(action.payload);
      state.pagination = action.payload;
    },

    setSort: (state, action) => {
      state.sortColumn = action.payload.sortColumn;
      state.sortOrder = action.payload.sortOrder;
    },

    setSearch: (state, action) => {
      state.keyword = action.payload;
    },

    setFilter: (state, action) => {
      state.filterValue = action.payload;
    },

    setRefresh: (state, action) => {
      state.refresh = action.payload;
    },

    setContactPointList: (state, action) => {
      state.contactPoints = action.payload;
    },

    setServers: (state, action) => {
      state.servers = action.payload;
    },

    setOtherServers: (state, action) => {
      state.otherServers = action.payload;
    },

    setDeletedOwnedServers: (state, action) => {
      state.deletedOwnedServers = action.payload;
    },

    setAddedServers: (state, action) => {
      state.addedServers = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setDeletedData: (state, action) => {
      state.deletedData = action.payload;
    },
  },
});

export const {
  setFilter,
  setData,
  setPagination,
  setSort,
  setSearch,
  setRefresh,
  setContactPointList,
  setServers,
  setOtherServers,
  setDeletedOwnedServers,
  setAddedServers,
  setLoading,
  setDeletedData,
} = slice.actions;
export default slice.reducer;

export const getCustomerList = (params = {}) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return getCustomerApi(params)
      .then((res) => {
        dispatch(setData(res));
        dispatch(
          setPagination({
            current: res[0] ? params.current : 0,
            total: res[0] ? res[0].Total : 0,
            pageSize: params.pageSize,
          })
        );
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const getContactPointList = () => (dispatch) => {
  getContactPointsApi().then((res) => {
    dispatch(setContactPointList(res));
  });
};

export const getServersCustomer = (id, keyword) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return getServersCustomerApi(id, keyword)
      .then((res) => {
        dispatch(setServers(res));
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject();
      });
  });
};

export const getOtherServers = (option, id, page, keyword) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    return getOtherServersApi(option, id, page, keyword)
      .then((res) => {

        dispatch(
          setOtherServers({
            data: getState().customerManagement.otherServers.data.concat(res),
            hasMore: res.length > 0,
            loading: false,
          })
        );

        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject();
      });
  });
};

export const deleteServersOfCustomer = (deletedServers, customerId) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    return deleteServersOfCustomerApi(deletedServers, customerId)
      .then((res) => {
        dispatch(setDeletedOwnedServers([]));
        dispatch(setRefresh(!getState().customerManagement.refresh));

        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject();
      });
  });
};


export const addServersForCustomer = (addedServers, customerId) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    return addServersForCustomerApi(addedServers, customerId)
      .then((res) => {
        dispatch(setAddedServers([]));
        dispatch(setRefresh(!getState().customerManagement.refresh));

        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject();
      });
  });
};


