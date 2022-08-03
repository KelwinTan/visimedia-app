import { Route, Routes } from "react-router-dom";
import "./App.less";
import Layout from "./components/Layout";
import Banner from "./pages/banner/lazy";
import Role from "./pages/role/lazy";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/role" element={<Role />} />
        <Route path="/banner" element={<Banner />} />
      </Routes>
    </Layout>
  );
}

export default App;
