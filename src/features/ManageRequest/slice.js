import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  blockIds: null,
};

const slice = createSlice({
  name: "requestManagement",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.blockIds = action.payload.blockIds;
    },
  },
});

export const { setFilter } = slice.actions;
export default slice.reducer;
