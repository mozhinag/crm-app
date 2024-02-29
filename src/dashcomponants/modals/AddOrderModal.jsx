// AddOrderModal.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addOrder, updateOrder,getOrders } from '../../redux/OrderSlice';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button,MenuItem,InputLabel,Select,FormControl } from '@mui/material';

function AddOrderModal({ isOpen, onClose, order = null }) { 
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [orderDetails, setOrderDetails] = useState({
    itemName: '',
    itemCode: '',
    quantity: '',
    companyName: '',
    payment: '',
    status: '',
  });

  
  useEffect(() => {
    if (order) {
      setOrderDetails(order);
    } else {
      setOrderDetails({
        itemName: '',
        itemCode: '',
        quantity: '',
        companyName: '',
        payment: '',
        status: '',
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setOrderDetails({ ...orderDetails, [name]: value });
    console.log(orderDetails);
  };

  const handleSubmit = () => {

    setSuccessMessage('');
    setErrorMessage('');
  
    if (order && order._id) { 
      dispatch(updateOrder({ id: order._id, updateData: orderDetails }))
        .unwrap()
        .then(() => {
          setSuccessMessage('Order updated successfully.');
         
          dispatch(getOrders()).catch(error => {
            console.error('Failed to refresh orders:', error);
            setErrorMessage('Failed to refresh orders. Please try again.');
          });
        })
        .catch(error => {
          console.error('Failed to update order:', error);
          setErrorMessage('Failed to update the order. Please try again.');
        })
        .finally(() => {
          onClose(); 
        });
    } else if (!order) { 
      dispatch(addOrder(orderDetails))
        .unwrap()
        .then(() => {
          setSuccessMessage('Order added successfully.');
        
          dispatch(getOrders()).catch(error => {
            console.error('Failed to refresh orders:', error);
            setErrorMessage('Failed to refresh orders. Please try again.');
          });
        })
        .catch(error => {
          console.error('Failed to add order:', error);
          setErrorMessage('Failed to add the order. Please try again.');
        })
        .finally(() => {
          onClose(); 
        });
    } else {
      console.error('Order ID is undefined. Cannot update order.');
      setErrorMessage('Order ID is undefined. Cannot process the order.');
      onClose(); 
    }
  };
  
  

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{order ? 'Edit Order' : 'Add New Order'}</DialogTitle>
      <DialogContent>
        <TextField margin="dense" name="itemName" label="Item Name" fullWidth value={orderDetails.itemName} onChange={handleChange} />
        <TextField margin="dense" name="itemCode" label="Item Code" fullWidth value={orderDetails.itemCode} onChange={handleChange} />
        <TextField margin="dense" name="quantity" label="Quantity" type="number" fullWidth value={orderDetails.quantity} onChange={handleChange} />
        <TextField margin="dense" name="companyName" label="Company Name" fullWidth value={orderDetails.companyName} onChange={handleChange} />
        <TextField margin="dense" name="payment" label="Payment" fullWidth value={orderDetails.payment} onChange={handleChange} />
        <FormControl fullWidth margin="dense">
        <InputLabel>Status</InputLabel>
                    <Select name="status" value={orderDetails.status} onChange={handleChange} label="Status">
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="booked">Booked</MenuItem>
                        <MenuItem value="cancel">cancel</MenuItem>
                    </Select>
                </FormControl>
                      </DialogContent>
      <DialogActions>
        <Button  color="secondary" variant="contained" onClick={onClose}>Cancel</Button>
        <Button  color="secondary" variant="contained" onClick={handleSubmit}>{order ? 'Update' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddOrderModal;
