
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/login.css";
import api from "../../api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmitBtn = async () => {
    const errors = {
      email: email ? validateEmail(email) ? "" : "Invalid email address" : "Email is required",
      password: password ? "" : "Password is required",
    };

    if (Object.values(errors).some((error) => error !== "")) {
      Object.entries(errors).forEach(([field, error]) => {
        if (error !== "") toast(`${field}: ${error}`, { type: "error" });
      });
    } else {
      await api({
        url: '/auth/login',
        method: 'POST',
        data: { email, password }
      }).then((res) => {
        const token = res?.data?.accessToken;
        localStorage.setItem("accessToken", token);
        toast('User login successful', { type: 'success' });
        navigate("/dashboard");
      }).catch((err) => {
        console.error("Error:", err.message);
        toast('Failed to login', { type: 'error' });
      })
    }
  };

  return (
    <div className="centered-body">
      <div className="container2">
        <div>
          <h1> Login Page </h1>
        </div>
        <div className="form">
          <div className="inputdiv">
            <div className="label-input-group">
              <label className="required-label"> Email </label>
              <input
                id="email"
                className="large-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="label-input-group">
              <label className="required-label"> Password </label>
              <input
                id="password"
                type="password"
                className="large-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button onClick={() => { handleSubmitBtn() }} className="btn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
