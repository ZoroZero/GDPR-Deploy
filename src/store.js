import { configureStore, combineReducers } from "@reduxjs/toolkit";
import appReducer from "features/App/slice";

function createReducer(asyncReducers) {
  return combineReducers({
    app: appReducer,
    ...asyncReducers,
  });
}

const store = configureStore({
  reducer: createReducer(),
  devTools: true,
});

export function configureAppStore() {
  store.asyncReducers = {};
  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  };
  return store;
}

export function getStore() {
  return store;
}
