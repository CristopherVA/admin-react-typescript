import React, { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import UserPage from "./pages/user/UserPage";
import AddUserPage from "./pages/user/AddUserPage";
import LoginPage from "./pages/login/LoginPage";
import Layout from "./components/Layout";
import { useGetUserQuery } from "./services/userApi";

function App() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user: string = localStorage.getItem("user") || '';
  

  const { refetch } = useGetUserQuery({to: "0", from: "5"});

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    } else{
      const dataUser = JSON.parse(user) || {};
      navigate("/", {state: dataUser});
      refetch();
    }
  }, [token]);

  return (
    <Routes>
      {!token && <Route path="/login" element={<LoginPage />} />}

      {token && (
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="user/create" element={<AddUserPage />} />
          <Route path="user/update/:id" element={<AddUserPage />} />
        </Route>
      )}

      <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
    </Routes>
  );
}

export default App;
