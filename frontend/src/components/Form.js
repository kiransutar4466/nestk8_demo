import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/style.css";

const RegistrationForm = ({
  onSubmit,
  view = false,
  data = {},
  edit = false,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    password: ""
  });

  useEffect(() => {
    if (view || edit) {
      setFormData(data);
    }
  }, []);

  const formChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber);
  };

  const handleSubmitBtn = () => {
    const errors = {
      firstName: formData?.firstName ? "" : "First Name is required",
      lastName: formData?.lastName ? "" : "Last Name is required",
      email: formData?.email
        ? validateEmail(formData?.email)
          ? ""
          : "Invalid email address"
        : "Email is required",
      phoneNumber: formData?.phoneNumber
        ? validatePhoneNumber(formData?.phoneNumber)
          ? ""
          : "Invalid phone number"
        : "Phone Number is required",
      country: formData?.country ? "" : "country is required",
    };

    console.log(
      "asfa ",
      Object.values(errors),
      Object.values(errors).some((error) => error !== "")
    );

    if (Object.values(errors).some((error) => error !== "")) {
      console.log("if");
      Object.entries(errors).forEach(([field, error]) => {
        if (error !== "") {
          toast.error(`${field}: ${error}`);
        }
      });
    } else {
      console.log("onSubmit called");
      onSubmit(formData);
    }
  };

  return (
    <>
      <div className="form">
        <div className="inputdiv">
          <div className="label-input-group">
            <label className="required-label"> First Name </label>
            <input
              id="firstname"
              name="firstName"
              className="large-input"
              value={formData?.firstName}
              onChange={formChangeHandler}
            />
          </div>

          <div className="label-input-group">
            <label className="required-label"> Last Name</label>
            <input
              id="lastname"
              name="lastName"
              className="large-input"
              value={formData?.lastName}
              onChange={formChangeHandler}
            />
          </div>

          <div className="label-input-group">
            <label className="required-label"> Email </label>
            <input
              id="email"
              name="email"
              className="large-input"
              value={formData?.email}
              onChange={formChangeHandler}
            />
          </div>

          <div className="label-input-group">
            <label className="required-label"> Phone Number </label>
            <input
              id="phonenumber"
              name="phoneNumber"
              className="large-input"
              value={formData?.phoneNumber}
              onChange={formChangeHandler}
            />
          </div>

          <div className="label-input-group">
            <label className="required-label"> Country </label>
            <input
              id="country"
              name="country"
              className="large-input"
              value={formData?.country}
              onChange={formChangeHandler}
            />
          </div>
        </div>
      </div>
      {!view && (
        <button onClick={() => handleSubmitBtn(formData)} className="btn">
          {edit ? "Update" : "Submit"}
        </button>
      )}
    </>
  );
};

export default RegistrationForm;
