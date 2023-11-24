import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style.css";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "../Form";
import axios from "axios";

const Registration = () => {
  const navigate = useNavigate();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSubmit = async (formData) => {
    const { firstName, lastName, email, phoneNumber, country } = formData;

    try {
      const apiUrl = "http://localhost:3000/api/user/register";

      const requestData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        country: country,
      };

      const response = await axios.post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("response is are", response);
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      setIsSuccessModalOpen(true);

      setTimeout(() => {
        setIsSuccessModalOpen(false);
        navigate("/loginPage");
      }, 3000); 
    } catch (error) {
      console.error("Error:", error);
    }
    console.log("Form submitted:", formData);
  };

  return (
    <div className="centered-body">
      <div className="container">
        <div>
          <h1> Registration Page </h1>
        </div>
        <RegistrationForm onSubmit={handleSubmit} />
        <SuccessModal isOpen={isSuccessModalOpen} />
        <ToastContainer />
      </div>
    </div>
  );
};

const SuccessModal = ({ isOpen }) => {
  return (
    isOpen && (
      <div className="success-modal">
        <p>Registration successful! Redirecting to login page...</p>
      </div>
    )
  );
};

export default Registration;
