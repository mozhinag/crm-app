import React from 'react';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserlist, getUserlist } from '../redux/UserListSlice';
import { Button, IconButton,TableCell,Paper,Table,TableContainer,TableHead,TableBody,TableRow } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
 import { FaPlus } from "react-icons/fa";
import AddUserListModal from './modals/AddUserListModal';
function UserList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedUserlist, setSelectedUserlist] = useState(null);
    const dispatch = useDispatch();
    const userlist = useSelector((state) => state.userlist.list);

    useEffect(() => {
        dispatch(getUserlist());
    }, [dispatch]);

    const handleOpenEditModal = (user) => { // Changed from (userlist) to (user) to pass the correct user object
        setSelectedUserlist(user);
        console.log(user);
        setEditModalOpen(true);
    };
    
    const handleDeleteCustomer = (_id) => {
        dispatch(deleteUserlist(_id));
    };
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    return (
        <div style={{
            width: '70%', // Adjust width as needed
            padding: '20px',
            borderRadius: '10px', // Optional: Adds rounded corners
            marginLeft: '90px',
            alignContent: 'center',
            marginTop: '80px',
            backgroundColor: 'pink'
        }}>
            <Button
                color="secondary" variant="contained"
                style={{ marginBottom: '20px', alignSelf: 'flex-end' }}
                onClick={handleOpenModal}>
                <FaPlus style={{ marginRight: '8px' }} /> Add UserList
            </Button>
            <TableContainer component={Paper}>
      <Table className="table" aria-label="simple table">
        <TableHead style={{backgroundColor:'gray'}}>
          <TableRow>
            <TableCell>Photo</TableCell>
            <TableCell>UserName</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userlist.map((user) => (
            <TableRow key={user._id}>
              <TableCell><img src={user.photo} alt={user.userName} style={{ width: '50px', height: '50px' }} /></TableCell>
              <TableCell>{user.userName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.type}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <IconButton aria-label="edit" onClick={() => handleOpenEditModal(user)}>
                  <EditIcon style={{ color: 'blue', fontSize: '1.1rem', border: '2px solid', padding: '5px', marginRight: '5px', cursor: 'pointer', backgroundColor: 'white', borderRadius: '5px' }} />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleDeleteCustomer(user._id)}>
                  <DeleteIcon style={{ color: 'red', fontSize: '1.1rem', border: '2px solid', padding: '5px', marginRight: '5px', cursor: 'pointer', backgroundColor: 'white', borderRadius: '5px' }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  
            <AddUserListModal open={isModalOpen} handleClose={handleCloseModal} />
            <AddUserListModal open={editModalOpen} handleClose={() => setEditModalOpen(false)} userlist={selectedUserlist} />

        </div>
    );
}

export default UserList;
