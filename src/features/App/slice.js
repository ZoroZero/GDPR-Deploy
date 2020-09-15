import { createSlice } from "@reduxjs/toolkit";
import {
  setAccessToken,
  setLocalStorageItem,
  deleteAllLocalStorageItem,
} from "utils/localstorage";
import { loginApi } from "api/authentication";

const initialState = {
  userInfo: {
    accessToken: null,
    exp: null,
    fullName: null,
    email: null,
  },
  role: null,
  token: null,
  loading: false,
  userId: null,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.access_token;
      state.role = action.payload.role;
      state.userId = action.payload.userId;
    },
    logout(state, action) {
      state.token = null;
      state.userInfo = initialState.userInfo;
    },
    loading(state, action) {
      state.loading = true;
    },
    stopLoading(state, action) {
      state.loading = false;
    },
  },
});

export const { login, logout, loading, stopLoading } = slice.actions;
export default slice.reducer;

export const onLogout = () => (dispatch) => {
  dispatch(loading());
  deleteAllLocalStorageItem();
  dispatch(logout());
  dispatch(stopLoading());
};

export const onLogin = (username, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(loading());
    return loginApi(username, password)
      .then((res) => {
        const { access_token, role, userId } = res;
        dispatch(login({ access_token, role, userId }));
        setAccessToken(access_token);
        setLocalStorageItem("role", role);
        setLocalStorageItem("userId", userId);
        resolve();
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  });
};
