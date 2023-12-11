import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/style.css";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "../../components/Form";
import api from "../../api";

const Registration = () => {
  const navigate = useNavigate();
  const handleSubmit = async (formData) => {
    const { firstName, lastName, email, phoneNumber, country } = formData;
      await api({
        url: "/user/register",
        method: "POST",
        data: { firstName, lastName, email, phoneNumber, country }
      }).then((res) =>{
        toast('User registered successfully', { type: "success" });
        navigate("/login");
      }).catch((err) => {
        const message = err.response?.data?.message
        toast((message || "Failed to register user"), { type: "error" });
      })
  };

  return (
    <div className="centered-body">
      <div className="container">
        <div>
          <h1> Registration Page </h1>
        </div>
        <RegistrationForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Registration;
