import { createSlice } from "@reduxjs/toolkit";
import {
  getContactPointsApi,
  getCustomerApi,
  getServersCustomerApi,
  getOtherServersApi,
} from "api/customer";
import { loading, stopLoading } from "features/App/slice";
import { act } from "react-dom/test-utils";

export const initialState = {
  blockIds: null,
  data: [],
  servers: [],
  otherServers: [],
  pagination: {
    total: 0,
    current: 1,
    pageSize: 10,
  },
  sortColumn: "CreatedDate",
  sortOrder: "descend",
  keyword: "",
  refresh: false,
  contactPoints: [],
  loading: false,
};

const slice = createSlice({
  name: "customerManagement",
  initialState,

  reducers: {
    setFilter: (state, action) => {
      state.blockIds = action.payload.blockIds;
    },

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

    setLoading: (state, action) => {
      state.loading = action.payload;
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
  setLoading,
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

export const getServersCustomer = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return getServersCustomerApi(id)
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

export const getOtherServers = (option, id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return getOtherServersApi(option, id)
      .then((res) => {
        dispatch(setOtherServers(res));
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject();
      });
  });
};
