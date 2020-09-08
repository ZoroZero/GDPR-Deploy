import { createSlice } from "@reduxjs/toolkit";
import { loading, stopLoading } from "features/App/slice";
import { getListRequestApi } from "api/requests";

export const initialState = {
  blockIds: null,
  data: [],
  pageSize: 5,
  totalPage: 1,
  currentPage: 1,
  sortOrder: true,
  sortBy: "",
};

const slice = createSlice({
  name: "requestManagement",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.blockIds = action.payload.blockIds;
    },
    setData: (state, action) => {
      state.data = action.payload.data;
    },
    setPagination: (state, action) => {
      state.currentPage = action.payload.currentPage;
      state.pageSize = action.payload.pageSize;
      state.totalPage = action.payload.totalPage;
    },
    setSortTable: (state, action) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload.currentPage;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload.pageSize;
      state.currentPage = 1;
    },
  },
});

export const {
  setFilter,
  setData,
  setPagination,
  setSortTable,
  setCurrentPage,
  setPageSize,
} = slice.actions;
export default slice.reducer;

export const getListRequests = (params = {}) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(loading());
    return getListRequestApi(params)
      .then((res) => {
        console.log(res);
        dispatch(
          setPagination({
            currentPage: res.CurrentPage,
            pageSize: params.PageSize,
            totalPage: res.TotalPage,
          })
        );
        dispatch(setData({ data: res.data }));
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  });
};
