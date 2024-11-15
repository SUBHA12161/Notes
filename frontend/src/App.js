import React from "react";
import { Routes, Route } from "react-router-dom";

import PrivateRoutes from './context/PrivateRoutes';
import PublicRoutes from './context/PublicRoutes';

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";

// Auth Pages
import SignUp from './Components/SignUp';
import Login from './Components/Login';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route index element={<Home />} />
        </Route>

        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="Login" element={<Login />} />
          <Route path="SignUp" element={<SignUp />} />
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
};

export default App;