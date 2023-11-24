import React, { useEffect, useState } from "react";
import "../ContentStyle.css";
import RegistrationForm from "../Form";
import axios from "axios";

const Content = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [iseditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleOptionsMenu = (rowId) => {
    setSelectedRow((prevData) => (prevData === rowId ? null : rowId));
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const storedToken = localStorage.getItem("accessToken");
    console.log("storedtoken", storedToken);

    const apiUrl = "http://localhost:3000/api/user";
    await axios
      .get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(async (response) => {
        console.log("response", response);
        setUserData(response?.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = async (formData) => {
    console.log("Form submitted:", formData);

    setUserData((prevData) => [...prevData, formData]);
    closeModal();

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
      console.log("requestData =================", requestData);

      const storedToken = localStorage.getItem("accessToken");
      console.log("storedtoken", storedToken);

      await axios
        .post(apiUrl, requestData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(async (response) => {
          console.log("response", response);
          await getUserData();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Network Error:", error);
    }
    console.log("Form submitted:", formData);
  };

  const handleUpdateUser = async (formData) => {
    const { firstName, lastName, email, phoneNumber, country } = formData;

    try {
      const apiUrl = `http://localhost:3000/api/user/${selectedRow?.id}`;
      console.log("selected==========", selectedRow?.id);

      const requestData = {
        firstName: firstName,
        lastName: lastName,
         email: email,
        phoneNumber: phoneNumber,
        country: country,
      };
      const storedToken = localStorage.getItem("accessToken");
      console.log("storedtoken", storedToken);

      await axios
        .patch(apiUrl, requestData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(async (response) => {
          console.log("response", response);
          await getUserData();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Network Error:", error);
    }
    console.log("Form submitted:", formData);
  };

  const onDeleteHandler = async () => {
    try {
      const apiUrl = `http://localhost:3000/api/user/${selectedRow?.id}`;
      console.log("selected==========", selectedRow?.id);

      const storedToken = localStorage.getItem("accessToken");
      console.log("storedtoken", storedToken);

      await axios
        .delete(apiUrl, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(async (response) => {
          console.log("response", response);
          await getUserData();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Network Error:", error);
    }
  };

  return (
    <div className="card">
      <div>
        <button className="btnAddUser" onClick={openModal}>
          Add User
        </button>

        {userData?.length > 0 ? (
          <table className="custom-table">
            <thead>
              <tr>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Country</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr key={index}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.country}</td>
                  <td>
                    <div
                      className="ellipsis-menu"
                      onClick={() => toggleOptionsMenu(user.id)}
                    >
                      &#8942;
                    </div>
                    {selectedRow === user.id && (
                      <div className="options-popup">
                        <button
                          onClick={() => {
                            setSelectedRow(user);
                            setIsViewModalOpen(true);
                          }} 
                        >
                          View
                        </button>
                        <button
                          onClick={() => {
                            setSelectedRow(user);
                            setIsEditModalOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedRow(user);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : ( 
          <h2>No Records Found </h2>
        )}

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <div>
                <h1> Add User Model </h1>
              </div>
              <RegistrationForm onSubmit={handleSubmit} />
            </div>
          </div>
        )}

        {/* View Modal */}
        {isViewModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setIsViewModalOpen(false)}>
                &times;
              </span>
              <div>
                <h1> View User Model </h1>
              </div>
              <RegistrationForm
                onSubmit={handleSubmit}
                view={isViewModalOpen}
                data={selectedRow}
              />
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {iseditModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setIsEditModalOpen(false)}>
                &times;
              </span>
              <div>
                <h1>Update User Model</h1>
              </div>
              <RegistrationForm
                onSubmit={handleUpdateUser}
                edit={iseditModalOpen}
                data={selectedRow}
              />
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span
                className="close"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                &times;
              </span>
              <div>
                <h2>Are you sure you want to delete this user?</h2>
              </div>
              <div>
                <button className="btn3" onClick={onDeleteHandler}>
                  Yes
                </button>{" "}
                &nbsp;&nbsp;
                <button
                  className="btn3"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  {" "}
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
