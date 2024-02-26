import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCustomer, getCustomers } from '../redux/CustomerSlice'; // Update the import path as necessary
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { FaPlus } from "react-icons/fa";
import AddCustomerModal from './modals/AddCustomerModal';


// Import EditCustomerModal if you have one

function Customers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Assume there's state to control edit modal visibility
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // To track which customer is being edited
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer.customers);

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const handleOpenEditModal = (customer) => {
    setSelectedCustomer(customer);
    console.log(customer);
    setEditModalOpen(true);
  };

  const handleDeleteCustomer = (_id) => {
    dispatch(deleteCustomer(_id));
  };
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>


      <div style={{
        width: '90%', // Adjust width as needed
        backgroundColor: '#f0f0f0', // Sets a different background color for the left container
        padding: '20px',
        borderRadius: '10px', // Optional: Adds rounded corners
        marginLeft: '90px',
        alignContent: 'center',
        marginTop: '60px',
        backgroundColor: 'pink'
      }}>       
       
        <TableContainer component={Paper} style={{ maxWidth: '100%' }}>
          <Table aria-label="simple table">
            <TableHead style={{ backgroundColor: 'gray' }}>
              <TableRow >
                <TableCell>S.No</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Mobile No.</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Customer Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer, index) => (
                <TableRow key={customer.id || index}>
                  <TableCell component="th" scope="row">{index + 1}</TableCell>
                  <TableCell>{customer.firstname} {customer.lastname}</TableCell>
                  <TableCell>{customer.mobile}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.customerType}</TableCell>
                  <TableCell>{customer.status}</TableCell>
                  <TableCell>
                    <IconButton aria-label="edit" onClick={() => handleOpenEditModal(customer)}>
                      <EditIcon style={{ color: 'blue', fontSize: '35px', border: '2px solid', padding: '5px', marginRight: '5px', cursor: 'pointer', backgroundColor: 'white', borderRadius: '5px' }} />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDeleteCustomer(customer._id)}>
                      <DeleteIcon style={{ color: 'red', fontSize: '35px', border: '2px solid', padding: '5px', marginRight: '5px', cursor: 'pointer', backgroundColor: 'white', borderRadius: '5px' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <AddCustomerModal open={isModalOpen} handleClose={handleCloseModal} />
        <AddCustomerModal open={editModalOpen} handleClose={() => setEditModalOpen(false)} customer={selectedCustomer} />
        <Button
        color="secondary" variant="contained"
        style={{ marginBottom: '20px', alignSelf: 'flex-end',marginTop:'20px' }} 
        onClick={handleOpenModal}>
          <FaPlus style={{ marginRight: '8px' }} /> Add Customer
        </Button>
      </div>
    </>
  );
}

export default Customers;
