import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Nav } from "../components/Nav";
import { About } from "../pages/About";
import { Footer } from "../components/Footer";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { AuthProvider } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { User, onAuthStateChanged } from "firebase/auth";
import { Dashboard } from "../pages/Dashboard";
import { CreatePost } from "../pages/CreatePost";

export type FirebaseUserState = User | null;

export const ApplicationRoutes = () => {
  const [user, setUser] = useState<FirebaseUserState>();
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user));
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <BrowserRouter>
      <AuthProvider value={{ user }}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
};
