import { createSlice } from "@reduxjs/toolkit";
import {
  setAccessToken,
  setLocalStorageItem,
  deleteAllLocalStorageItem,
} from "utils/localstorage";
import { loginApi } from "api/authentication";
import { getAllNotifications, putReadNotificationApi } from "api/notification";

const initialState = {
  userInfo: {
    exp: null,
    fullName: null,
    email: null,
  },
  role: null,
  token: null,
  loading: false,
  userId: null,
  username: null,
  avatar: null,
  notifications: [],
  numberNewNotif: 0,
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
    setua(state, action) {
      state.username = action.payload.username;
      state.avatar = action.payload.avatar;
    },
    setNotification(state, action) {
      state.notifications = action.payload.notifications;
      state.numberNewNotif = action.payload.numberNewNotif;
    },
  },
});

export const {
  login,
  logout,
  loading,
  stopLoading,
  setua,
  setNotification,
} = slice.actions;
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
        dispatch(
          login({ access_token: access_token, role: role, userId: userId })
        );
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

export const getNotifications = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    return getAllNotifications()
      .then((res) => {
        dispatch(
          setNotification({
            notifications: res.data,
            numberNewNotif: res.data.length > 0 ? res.data[0].TotalNew : 0,
          })
        );
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const onReadNotification = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return putReadNotificationApi(id)
      .then((res) => {
        dispatch(getNotifications());
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
