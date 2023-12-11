import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signin from "./pages/auth/Signin";
import Admin from "./pages/admin/Admin";
import Home from "./pages/home/Home";
import Nav from "./layout/nav/Nav";
import Product from "./routes/products/Product";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Create from "./routes/create/Create";
import Manage from "./routes/manage/Manage";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product-view/:id" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route path="signin" element={<Signin />} />
        <Route path="admin" element={<Admin />}>
          <Route path="create" element={<Create />} />
          <Route path="manage" element={<Manage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
