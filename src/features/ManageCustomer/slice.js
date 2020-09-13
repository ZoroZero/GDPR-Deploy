import { createSlice } from "@reduxjs/toolkit";
import { getContactPointsApi, getCustomerApi } from "api/customer";
import { loading, stopLoading } from "features/App/slice";

export const initialState = {
  blockIds: null,
  data: [],
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
  setLoading,
} = slice.actions;
export default slice.reducer;

export const getCustomerList = (params = {}) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return getCustomerApi(params)
      .then((res) => {
        console.log("Customer List", res);
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
  console.log("get contactpoint list");
  getContactPointsApi().then((res) => {
    console.log(res);
    dispatch(setContactPointList(res));
  });
};
