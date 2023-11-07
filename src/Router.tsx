import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Mine from "./pages/Mine";
import Membership from "./pages/Membership";
import Login from "./pages/Membership/login";
import Register from "./pages/Membership/register";

const Router: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/mine" element={<Mine />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/membership-login" element={<Login />} />
        <Route path="/membership-register" element={<Register />} />

        <Route path="*" element={<Navigate to="/landing" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
