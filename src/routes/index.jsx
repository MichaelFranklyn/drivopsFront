import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import CarsModal from "../components/CarsModal";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { getItem } from "../utils/localStorage";

function ProtectRoutes({ redirectTo }) {
  let authentication = getItem("token");

  return authentication ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default function SwitchRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectRoutes redirectTo={"/signin"} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/teste" element={<CarsModal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
