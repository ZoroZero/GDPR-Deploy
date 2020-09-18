import React, { Suspense } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import "./index.scss";

import NotFound from "../../components/NotFound";
import MainPage from "./pages/Main";
import { AbilityContext } from "permission/can";
import { useAbility } from "@casl/react";

Customer.propTypes = {};

function Customer() {
  const ability = useAbility(AbilityContext);
  const match = useRouteMatch();
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <Switch>
        <Route exact path={match.url} component={MainPage} />
d        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default Customer;