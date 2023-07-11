import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Nav } from "../components/Nav";
import { About } from "../pages/About";
import { Footer } from "../components/Footer";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export const ApplicationRoutes = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
