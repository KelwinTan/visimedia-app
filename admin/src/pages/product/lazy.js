import loadable from "@loadable/component";

export default loadable(() =>
  import(/* webpackChunkName: "product-routes-lazy" */ "./routes")
);
