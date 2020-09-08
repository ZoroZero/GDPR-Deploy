import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  startDate: null,
  endDate: null,
  SearchKey: "",
  PageNo: 1,
  PageSize: 7,
  SortBy: "",
  SortOrder: 0,
};

const slice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
    setSearchKey: (state, action) => {
      state.SearchKey = action.payload.SearchKey;
    },
    setPageNo: (state, action) => {
      state.PageNo = action.payload.PageNo;
    },
    setPageSize: (state, action) => {
      state.PageSize = action.payload.PageSize;
    },
    setSortBy: (state, action) => {
      state.SortBy = action.payload.SortBy;
    },
    setSortOrder: (state, action) => {
      state.SortOrder = action.payload.Sortorder;
    },
  },
});

export const {
  setFilter,
  setSearchKey,
  setPageNo,
  setPageSize,
  setSortBy,
  setSortOrder,
} = slice.actions;
export default slice.reducer;
