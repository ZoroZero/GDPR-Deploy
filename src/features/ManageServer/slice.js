import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  blockIds: null,
  sortColumn: 'Name',
  sortOrder: 'ascend'
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

  },
});

export const { setFilter, setSort } = slice.actions;
export default slice.reducer;
