import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  record: {},
};

const slice = createSlice({
  name: "userSetting",
  initialState,
  reducers: {
    setRecord: (state, action) => {
      state.record = action.payload.record;
    },
  },
});

export const { setRecord } = slice.actions;
export default slice.reducer;
