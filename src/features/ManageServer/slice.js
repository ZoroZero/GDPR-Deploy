import { createSlice } from "@reduxjs/toolkit";
import { SERVER_CONSTANTS } from "constants/ManageServer/server";

export const initialState = {
  blockIds: null,
  sortColumn: SERVER_CONSTANTS.DEFAULT_SORT_COLUMN,
  sortOrder: SERVER_CONSTANTS.DEFAULT_SORT_ORDER,
  data: [], 
  pagination: {
    page: 1,
    pageSize: 10
  }
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
  },
});

export const { setFilter, setSort, setData, setPagination } = slice.actions;
export default slice.reducer;
