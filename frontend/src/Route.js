import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./LoginPage/Login";
import Registration from "./RegistrationPage/Registration";
import DashBoard from "./DashBoard/DashBoard";

const Router2 = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Registration />} />
          <Route path="/loginPage" element={<Login />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default Router2;
