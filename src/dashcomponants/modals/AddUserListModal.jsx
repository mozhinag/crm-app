import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addUserlist, updateUserlist,getUserlist } from '../../redux/UserListSlice';

function AddUserListModal({ open, handleClose, userlist }) {
  // const [successMessage, setSuccessMessage] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState({
    photo: '',
    userName: '',
    email: '',
    type: '',
    status: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (userlist) {
      setUserData({
        photo: userlist.photo || '',
        userName: userlist.userName || '',
        email: userlist.email || '',
        type: userlist.type || '',
        status: userlist.status || '',
      });
    }
  }, [userlist]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
   

      // setSuccessMessage('');
      // setErrorMessage('');
    
      if (userlist && userlist._id) {
        dispatch(updateUserlist({ id: userlist._id, updateData: userData }))
          .unwrap()
          .then(() => {
            // setSuccessMessage('User updated successfully.');

            dispatch(getUserlist()).catch(error => {
              console.error('Failed to refresh user:', error);
              // setErrorMessage('Failed to refresh user. Please try again.');
            });
          })
          .catch(error => {
            console.error('Failed to update user:', error);
            // setErrorMessage('Failed to update the user. Please try again.');
          })
          .finally(() => {
            handleClose();
          })
         } else if (!userlist) {
            dispatch(addUserlist(userData))
            .unwrap()
            .then(() => {
              // setSuccessMessage('User added successfully.');

              dispatch(getUserlist()).catch(error => {
                console.error('Failed to refresh user:', error);
                // setErrorMessage('Failed to refresh user. Please try again.');
              });
            })
            .catch(error => {
              console.error('Failed to add user:', error);
              // setErrorMessage('Failed to add the user. Please try again.');
            })
            .finally(() => {
              handleClose();
            });
          }
     
       else {
        console.error('User ID is undefined. Cannot update User.');
        // setErrorMessage('User ID is undefined. Cannot process the User.');
        handleClose(); 
      }
    };
    
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{userlist ? 'Edit User' : 'Add User'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="photo"
          label="Photo URL"
          type="text"
          fullWidth
          name="photo"
          value={userData.photo}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="userName"
          label="User Name"
          type="text"
          fullWidth
          name="userName"
          value={userData.userName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
         <FormControl fullWidth margin="dense">
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            name="type"
            value={userData.type}
            label="Type"
            onChange={handleChange}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="customer service">Customer Service</MenuItem>
            <MenuItem value="sales representative">Sales Representative</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            name="status"
            value={userData.status}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="deactive">Deactive</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" variant="contained" onClick={handleClose}>Cancel</Button>
        <Button color="secondary" variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUserListModal;
