import React from 'react';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserlist, getUserlist } from '../redux/UserListSlice';
import { Button, IconButton } from '@mui/material';
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
            <table className="table">
                <thead  style={{backgroundColor:'gray'}}>
                    <tr>
                        <th>Photo</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userlist.map(user => (
                        <tr key={user._id}>
                            <td><img src={user.photo} alt={user.userName} style={{ width: '50px', height: '50px' }} /></td>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td>{user.type}</td>
                            <td>{user.status}</td>
                            <td>
                                <IconButton aria-label="edit" onClick={() => handleOpenEditModal(user)}>
                                    <EditIcon style={{ color: 'blue', fontSize: '35px', border: '2px solid', padding: '5px', marginRight: '5px', cursor: 'pointer', backgroundColor: 'white', borderRadius: '5px' }} />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={() => handleDeleteCustomer(user._id)}>
                                    <DeleteIcon style={{ color: 'red', fontSize: '35px', border: '2px solid', padding: '5px', marginRight: '5px', cursor: 'pointer', backgroundColor: 'white', borderRadius: '5px' }} />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AddUserListModal open={isModalOpen} handleClose={handleCloseModal} />
            <AddUserListModal open={editModalOpen} handleClose={() => setEditModalOpen(false)} userlist={selectedUserlist} />

        </div>
    );
}

export default UserList;
