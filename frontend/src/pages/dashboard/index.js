import React, { useEffect, useState } from "react";
import "../../styles/content.css";
import RegistrationForm from "../../components/Form";
import api from "../../api";
import { toast } from "react-toastify";

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
    setIsDeleteModalOpen(false);
  };

  const toggleOptionsMenu = (rowId) => {
    setSelectedRow((prevData) => (prevData === rowId ? null : rowId));
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const storedToken = localStorage.getItem("accessToken");
    await api({
      url: '/user',
      headers: {
        Authorization: `Bearer ${storedToken}`
      },
      method: 'GET'
    }).then(async (response) => {
      console.log("response", response);
      setUserData(response?.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  const handleSubmit = async (formData) => {
    setUserData((prevData) => [...prevData, formData]);
    closeModal();
    const { firstName, lastName, email, phoneNumber, country } = formData;
    const payload = { firstName, lastName, email, phoneNumber, country };
    const storedToken = localStorage.getItem("accessToken");
    await api({
      url: '/user/register',
      method: 'POST',
      headers: { Authorization: `Bearer ${storedToken}` },
      data: payload
    }).then(async () => {
      toast('User added successfully', { type: 'success' })
      await getUserData()
    }).catch((error) => {
      console.error("Error:", error);
      toast(error.message, { type: 'error' })
    });
    closeModal();
  };

  const handleUpdateUser = async (formData) => {
    const { firstName, lastName, email, phoneNumber, country } = formData;
    const payload = { firstName, lastName, email, phoneNumber, country };
    const storedToken = localStorage.getItem("accessToken");
    await api({
      url: `/user/${selectedRow?.id}`,
      method: 'PATCH',
      data: payload,
      headers: { Authorization: `Bearer ${storedToken}` }
    }).then(async () => {
      toast('User updated successfully', { type: 'success' })
      await getUserData()
    }).catch((error) => {
      console.error("Error:", error);
      toast(error.message, { type: 'error' })
    });
  };

  const onDeleteHandler = async () => {
    const storedToken = localStorage.getItem("accessToken");
    await api({
      url: `/user/${selectedRow?.id}`,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${storedToken}` }
    }).then(async (response) => {
      toast('User deleted successfully', { type: 'success' })
      await getUserData();
    })
    .catch((error) => {
      console.error("Error:", error);
      toast(error.message, { type: 'error' });
    });
    closeModal();
  };

  return (
    <div className="card">
      <div>
        <button className="btnAddUser" onClick={openModal}>
          Add User
        </button>
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
              { !userData.length ? <tr><td colSpan={6} style={{ textAlign: 'center' }}>No Records Found</td></tr> :
              userData.map((user, index) => (
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
