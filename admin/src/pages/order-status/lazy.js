import loadable from "@loadable/component";

export default loadable(() =>
  import(/* webpackChunkName: "order-status-lazy" */ "./index")
);
