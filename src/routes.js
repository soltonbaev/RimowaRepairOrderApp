import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ROUTES } from "./constants/routes";

import Home from "./components/Home";
import AssociateForm from "./components/AssociateForm";
import ClientForm from "./components/ClientForm";
import RepairOrders from "./components/RepairOrders";
import Signature from "./components/Signature";
import OrderPreview from "./components/OrderPreview";

const Routes = () => (
  <Router>
    <Switch>
      <Route path={ROUTES.HOME} component={Home} exact />
      <Route path={ROUTES.REPAIR_ORDERS.PATH} component={RepairOrders} exact />
      <Route
        path={ROUTES.REPAIR_ORDERS.NESTED.PREVIEW}
        component={OrderPreview}
        exact
      />
      <Route
        path={ROUTES.NEW_REPAIR_ORDER.NESTED.ASSOCIATE}
        component={AssociateForm}
        exact
      />
      <Route
        path={ROUTES.NEW_REPAIR_ORDER.NESTED.CLIENT}
        component={ClientForm}
        exact
      />
      <Route
        path={ROUTES.NEW_REPAIR_ORDER.NESTED.SIGN}
        component={Signature}
        exact
      />
      <Route
        path={ROUTES.NEW_REPAIR_ORDER.NESTED.ORDER_PREVIEW}
        component={OrderPreview}
        exact
      />
    </Switch>
  </Router>
);

export default Routes;
