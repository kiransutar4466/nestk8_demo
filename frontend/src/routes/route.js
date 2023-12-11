import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Registration from "../pages/registration";
import SideBar from "../pages/navigation/sidebar";
import DashBoard from "../pages/dashboard";

const Router = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<>
            <SideBar />
            <DashBoard />
          </>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default Router;
