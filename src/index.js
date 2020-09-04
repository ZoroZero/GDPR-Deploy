import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import App from "features/App";

import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import { configureAppStore } from "./store";
require("dotenv").config();
const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log(BASE_URL);
ReactDOM.render(
  <Provider store={configureAppStore()}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
