import { createSlice } from "@reduxjs/toolkit";
import { loading, stopLoading } from "features/App/slice";
import {
  getListRequestApi,
  createRequestApi,
  getServerOptionsApi,
  approveRequestApi,
  cancelRequestApi,
  getRequestDetailApi,
  updateRequestApi,
  getListUserOptionsApi,
  exportRequestApi,
} from "api/requests";
import { message } from "antd";

export const initialState = {
  blockIds: null,
  data: [],
  pageSize: 5,
  totalPage: 1,
  currentPage: 1,
  sortOrder: "descend",
  sortBy: "",
  showModal: false,
  lstServer: [],
  requestDetail: {},
  requestLogs: [],
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
    setListServer: (state, action) => {
      state.lstServer = action.payload.lstServer;
    },
    setRequestDetail: (state, action) => {
      state.requestDetail = action.payload.requestDetail;
      state.requestLogs = action.payload.requestLogs;
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
  setListServer,
  setRequestDetail,
} = slice.actions;
export default slice.reducer;

export const getListRequests = (params = {}) => (dispatch) => {
  return new Promise((resolve, reject) => {
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
      });
  });
};

export const onCreateNewRequest = (data = {}) => (dispatch) => {
  console.log("hello");
  return new Promise((resolve, reject) => {
    dispatch(loading());
    return createRequestApi(data)
      .then((res) => {
        console.log(res);
        message.success("success");
        dispatch(setModal({ showModal: false }));
        dispatch(
          getListRequests({
            pageSize: initialState.pageSize,
            pageNumber: initialState.currentPage,
            sortColumn: initialState.sortBy,
            sortOrder: initialState.sortOrder,
            keyword: "",
          })
        );
        resolve(res);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        reject(error);
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  });
};

export const getListServerOptions = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    return getServerOptionsApi()
      .then((res) => {
        console.log(res);
        dispatch(setListServer({ lstServer: res.data.data }));
        resolve(res);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const getListUserOptions = () => {
  return new Promise((resolve, reject) => {
    return getListUserOptionsApi()
      .then((res) => {
        console.log(res);
        resolve(res);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const approveRequest = (value) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(loading());
    return approveRequestApi(value)
      .then((res) => {
        message.success("success");
        dispatch(getRequestDetail(value.requestId));
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

export const cancelRequest = (value) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(loading());
    return cancelRequestApi(value)
      .then((res) => {
        message.success("success");
        dispatch(getRequestDetail(value.requestId));
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

export const getRequestDetail = (value) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return getRequestDetailApi(value)
      .then((res) => {
        console.log(res);
        if (res.data) {
          dispatch(
            setRequestDetail({
              requestDetail: res.data.detail,
              requestLogs: res.data.logs,
            })
          );
        }
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const onUpdateRequest = (value, requestId) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(loading());
    return updateRequestApi(value, requestId)
      .then((res) => {
        dispatch(getRequestDetail(requestId));
        message.success("success");
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

export const exportRequestByServer = (val) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return exportRequestApi(val)
      .then((res) => {
        console.log(res);
        message.success("success");
        resolve(res);
      })
      .catch((error) => {
        message.error("fail");
        console.log(error);
      });
  });
};
