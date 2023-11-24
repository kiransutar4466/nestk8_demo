
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../Loginstyle.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmitBtn = async () => {
    const errors = {
      email: email
        ? validateEmail(email)
          ? ""
          : "Invalid email address"
        : "Email is required",
      password: password ? "" : "Password is required",
    };

    if (Object.values(errors).some((error) => error !== "")) {
      Object.entries(errors).forEach(([field, error]) => {
        if (error !== "") {
          toast.error(`${field}: ${error}`);
        }
      });
    } else {
      try {
        const apiUrl = "http://localhost:3000/api/auth/login";
        const requestData = {
          email: email,
          password: password,
        };

        const response = await axios.post(apiUrl, requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("response is", response);
        const token = response?.data?.accessToken;
        localStorage.setItem("accessToken", token);

        setShowSuccessModal(true);

        setTimeout(() => {
          navigate("/dashboard");
        }, 3000); 
      } catch (error) {
        console.error("Error:", error);
      }
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
                className="large-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button onClick={handleSubmitBtn} className="btn">
          Submit
        </button>
        <ToastContainer />

        {showSuccessModal && (
          <div className="success-modal">
            <p>Login successful! Redirecting to dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
