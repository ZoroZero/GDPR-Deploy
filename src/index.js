import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import App from "features/App";

import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import { configureAppStore } from "./store";
import { AbilityContext } from "permission/can";
import ability from "permission/ability";

ReactDOM.render(
  <Provider store={configureAppStore()}>
    <HelmetProvider>
      <AbilityContext.Provider value={ability}>
        <App />
      </AbilityContext.Provider>
    </HelmetProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
