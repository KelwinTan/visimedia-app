import { Route, Routes } from "react-router-dom";
import "./App.less";
import Layout from "./components/Layout";
import Banner from "./pages/banner/lazy";
import NotFound from "./pages/not-found/lazy";
import Role from "./pages/role/lazy";

function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/role" element={<Role />} />
        <Route exact path="/" element={<Role />} />
        <Route exact path="/banner" element={<Banner />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
