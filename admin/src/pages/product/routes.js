import React from "react";
import { Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";

const Home = loadable(() =>
  import(/* webpackChunkName: "product-lazy" */ "./index")
);

const Detail = loadable(() =>
  import(/* webpackChunkName: "product-detail-lazy" */ "./form/detail")
);

const ProductRoutes = () => {
  return (
    <Switch>
      <Route exact path="/product/detail" component={Detail} />
      <Route exact path="/product" component={Home} />
    </Switch>
  );
};

export default ProductRoutes;
