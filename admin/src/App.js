import { Route, Routes } from "react-router-dom";
import "./App.less";
import Layout from "./components/Layout";
import Banner from "./pages/banner/lazy";
import Category from "./pages/category/lazy";
import Product from "./pages/product/lazy";
import Variant from "./pages/variant/lazy";
import NotFound from "./pages/not-found/lazy";
import Role from "./pages/role/lazy";

function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/role" element={<Role />} />
        <Route exact path="/" element={<Role />} />
        <Route exact path="/banner" element={<Banner />} />
        <Route exact path="/category" element={<Category />} />
        <Route exact path="/product" element={<Product />} />
        <Route exact path="/variant" element={<Variant />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
