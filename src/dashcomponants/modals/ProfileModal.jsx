import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { getProfile } from '../../redux/ProfileSlice';

function ProfileModal({ show, onClose, onEdit }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const profiles = useSelector((state) => state.profile.profiles);

  useEffect(() => {
    if (profiles.length === 0) {
      dispatch(getProfile());
    }
  }, [dispatch, profiles.length]);

  const profileData = profiles.find(profile => profile.email === user?.email) || {};

  if (!show || !user) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'gray',
      padding: '20px',
      zIndex: 1000,
      color: 'black',
      borderRadius: '10px',
    }}>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" >
         
          <h2>Profile Details</h2>
          <p><strong>Full Name:</strong> {profileData.name}</p>
          <p><strong>Date of Birth:</strong> {profileData.dob}</p>
          <p><strong>Gender:</strong> {profileData.gender}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Phone Number:</strong> {profileData.mobileNo}</p>
        
          <Button color="secondary" variant="contained" style={{ marginLeft: '10px' }} onClick={onClose}>Close</Button>
       
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
