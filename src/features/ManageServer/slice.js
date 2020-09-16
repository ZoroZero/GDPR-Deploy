import { createSlice } from "@reduxjs/toolkit";
import { SERVER_CONSTANTS } from "constants/ManageServer/server";
import { getAllServerApi } from "api/server";
export const initialState = {
  blockIds: null,
  sortColumn: SERVER_CONSTANTS.DEFAULT_SORT_COLUMN,
  sortOrder: SERVER_CONSTANTS.DEFAULT_SORT_ORDER,
  data: [], 
  pagination: {
    page: 1,
    pageSize: 10
  },
  total: 0,
  refresh: false,
  lstServer: []
};

const slice = createSlice({
  name: "serverManagement",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.blockIds = action.payload.blockIds;
    },

    setSort: (state, action) => {
      state.sortColumn = action.payload.sortColumn;
      state.sortOrder = action.payload.sortOrder;
    },

    setData:  (state, action) => {
      state.data = action.payload.data;
    },

    setPagination:  (state, action) => {
      state.pagination = action.payload.pagination;
    },

    setTotal:  (state, action) => {
      state.total = action.payload.total;
    },

    setRefresh: (state, action) => {
      state.refresh = action.payload
    },

    setListServer: (state, action) => {
      state.lstServer = action.payload.lstServer;
    },
  },
});

export const { setFilter, setSort, setData, setPagination, setTotal, setRefresh, setListServer } = slice.actions;
export default slice.reducer;


export const getListServerOptions = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    return getAllServerApi()
      .then((res) => {
        console.log(res);
        dispatch(setListServer({ lstServer: res.data }));
        resolve(res);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
