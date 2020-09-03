import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, deleteAllCookies } from "utils/cookies";
import { loginApi } from "api/authentication";
import { setAuthToken } from "axios/auth.instance";

export const initialState = {
  userInfo: {
    accessToken: null,
    exp: null,
    fullName: null,
    email: null,
  },
  token: null,
  loading: false,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.access_token;
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
  deleteAllCookies();
  dispatch(logout());
  dispatch(stopLoading());
};

export const onLogin = (username, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(loading());
    return loginApi(username, password)
      .then((res) => {
        const { access_token } = res;
        console.log(access_token);
        setCookie("token", access_token);
        setAuthToken(access_token);
        dispatch(login({ access_token }));
        dispatch(stopLoading());
        resolve();
      })
      .catch((error) => {
        dispatch(stopLoading());
        reject(error);
      });
  });
};
