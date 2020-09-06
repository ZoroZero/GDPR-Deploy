import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  setAccessToken,
  deleteAccessToken,
  getLocalStorageItem,
  setLocalStorageItem,
  deleteAllLocalStorageItem,
} from "utils/localstorage";
import { loginApi } from "api/authentication";
import { setAuthToken } from "axios/auth.instance";

const initialState = {
  userInfo: {
    accessToken: null,
    exp: null,
    fullName: null,
    email: null,
    role: null,
  },
  role: null,
  token: null,
  loading: false,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.access_token;
      state.role = action.payload.role;
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
        const access_token = "adfjlawjif";
        // const { access_token } = res;
        dispatch(login({ access_token, role: "dc-member" }));
        setAccessToken(access_token);
        setLocalStorageItem("role", "dc-member");
        // dispatch(stopLoading());
        resolve();
      })
      .catch((error) => {
        // dispatch(stopLoading());
        reject(error);
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  });
};
