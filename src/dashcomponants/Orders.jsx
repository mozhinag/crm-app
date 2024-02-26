import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, deleteOrder } from '../redux/OrderSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { FaPlus } from "react-icons/fa";
import AddOrderModal from './modals/AddOrderModal';

function Orders() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.list);
   
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    const handleEditClick = (order) => {
        setEditingOrder(order);
        setIsModalOpen(true);
    };
    const handleDeleteClick = (_id) => {
        dispatch(deleteOrder(_id));
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingOrder(null);
    };

    return (
        <div style={{
            width: '90%', // Adjust width as needed
            padding: '20px',
            borderRadius: '10px', // Optional: Adds rounded corners
            marginLeft: '90px',
            alignContent: 'center',
            marginTop: '60px',
            backgroundColor: 'pink' }}>      <Paper>
              <TableContainer style={{ maxWidth: '100%' }}>
                    <Table>
                        <TableHead style={{ backgroundColor: 'gray' }}>

                            <TableRow>
                                <TableCell>S.No</TableCell>
                                <TableCell>Item Name</TableCell>
                                <TableCell>Item Code</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Company Name</TableCell>
                                <TableCell>Payment</TableCell>
                                <TableCell> Booking Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{order.itemName}</TableCell>
                                    <TableCell>{order.itemCode}</TableCell>
                                    <TableCell>{order.quantity}</TableCell>
                                    <TableCell>{order.companyName}</TableCell>
                                    <TableCell>{order.payment}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEditClick(order)}>
                                            <EditIcon style={{ color: 'blue', fontSize: '35px', border: '2px solid', padding: '5px', marginRight: '5px', cursor: 'pointer', backgroundColor: 'white', borderRadius: '5px' }} />
                                        </IconButton>
                                        <IconButton onClick={() => (handleDeleteClick(order._id))}>
                                            <DeleteIcon style={{ color: 'red', fontSize: '35px', border: '2px solid', padding: '5px', marginRight: '5px', cursor: 'pointer', backgroundColor: 'white', borderRadius: '5px' }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
              
                {isModalOpen && (
                    <AddOrderModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        order={editingOrder} // Pass the order to be edited to the modal
                    />
                )}
            </Paper>
            <Button color="secondary" variant="contained"style={{ marginBottom: '20px', alignSelf: 'flex-end',marginTop:'20px' }}  startIcon={<FaPlus />} onClick={() => { setIsModalOpen(true); setEditingOrder(null); }}>
                    Add Order
                </Button>
        </div>
    );
}

export default Orders;
