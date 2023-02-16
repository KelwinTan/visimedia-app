import loadable from "@loadable/component";

export default loadable(() =>
  import(/* webpackChunkName: "order-lazy" */ "./index")
);
