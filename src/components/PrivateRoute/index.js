import React from "react";
import { Redirect, Route } from "react-router-dom";
import { checkToken } from "../../utils/localstorage";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkToken() !== null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
