
import React, { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import ProfileModal from './modals/ProfileModal'; // Import the ProfileModal component



function Nav() {
  const [showProfileModal, setShowProfileModal] = useState(false); // State to control modal visibility

  const handleIconClick = () => {
    setShowProfileModal(true); // Show the modal when icon is clicked
  };

  const handleClose = () => {
    setShowProfileModal(false); // Hide the modal
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <h2>VM PRODUCTS CRM</h2>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          <FaUserCircle size="30" onClick={handleIconClick} style={{ cursor: 'pointer'}} />
        </div>
      </nav>
      <ProfileModal show={showProfileModal} onClose={handleClose} />
    </>
  );
}

export default Nav;
