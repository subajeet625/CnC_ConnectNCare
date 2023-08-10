import React from 'react';
import { RiCloseLine } from 'react-icons/ri';
import '../css/Modal.css';
import { useNavigate } from 'react-router-dom';

export default function Modal({ setModalOpen }) {
  const navigate = useNavigate();

  const handleLogOut = () => {
    setModalOpen(false);
    localStorage.clear();
    navigate('./SignIn');
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="modalContainer">
      <div className="modal">
        <div className="modalHeader">
          <h5 className="heading">Confirm</h5>
          <button className="closeBtn" onClick={handleCloseModal}>
            <RiCloseLine />
          </button>
        </div>
        <div className="modalContent">
          <p>Do you really want to log out?</p>
        </div>
        <div className="modalActions">
          <div className="actionsContainer">
            <button className="logOutBtn" onClick={handleLogOut}>
              Log Out
            </button>
            <button className="cancelBtn" onClick={handleCloseModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
