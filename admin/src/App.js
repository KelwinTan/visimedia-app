import { Route, Switch } from "react-router-dom";
import "./App.less";
import Layout from "./components/Layout";
import Banner from "./pages/banner/lazy";
import Category from "./pages/category/lazy";
import Product from "./pages/product/lazy";
import BestProduct from "./pages/best-product/lazy";
import Variant from "./pages/variant/lazy";
import NotFound from "./pages/not-found/lazy";
import Role from "./pages/role/lazy";
import Order from "./pages/order/lazy";
import OrderStatus from "./pages/order-status/lazy";

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/role" component={Role} />
        <Route exact path="/" component={Role} />
        <Route exact path="/banner" component={Banner} />
        <Route exact path="/category" component={Category} />
        <Route exact path="/variant" component={Variant} />
        <Route path="/product" component={Product} />
        <Route exact path="/best-product" component={BestProduct} />
        <Route exact path="/order" component={Order} />
        <Route exact path="/order-status" component={OrderStatus} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
