import { createSlice } from "@reduxjs/toolkit";
import { loading, stopLoading } from "features/App/slice";
import { getListRequestApi, createRequestApi } from "api/requests";

export const initialState = {
  blockIds: null,
  data: [],
  pageSize: 5,
  totalPage: 1,
  currentPage: 1,
  sortOrder: "descend",
  sortBy: "",
  showModal: false,
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
    setModal: (state, action) => {
      state.showModal = action.payload.showModal;
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
  setModal,
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
            pageSize: params.pageSize,
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

export const onCreateNewRequest = (data = {}) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(loading());
    return createRequestApi(data)
      .then((res) => {
        console.log(res);
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
