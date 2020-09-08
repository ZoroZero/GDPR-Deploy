import React, { Suspense } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import "./index.scss";

import NotFound from "../../components/NotFound";
import MainPage from "./pages/Main";
import DetailPage from "./pages/Detail";
import { AbilityContext } from "permission/can";
import { useAbility } from "@casl/react";

Customer.propTypes = {};

function Customer() {
  const ability = useAbility(AbilityContext);
  console.log(ability.can("access", "manage-customer"));
  const match = useRouteMatch();
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <Switch>
        <Route exact path={match.url} component={MainPage} />
        <Route exact path={`${match.url}/:customerId`} component={DetailPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default Customer;