import loadable from "@loadable/component";

export default loadable(() =>
  import(/* webpackChunkName: "variant-lazy" */ "./index")
);
