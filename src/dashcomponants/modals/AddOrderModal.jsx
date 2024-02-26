// AddOrderModal.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addOrder, updateOrder } from '../../redux/OrderSlice';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button,MenuItem,InputLabel,Select,FormControl } from '@mui/material';

function AddOrderModal({ isOpen, onClose, order = null }) { // Default order to null for new orders
  const dispatch = useDispatch();
  // Initialize form with empty values or existing order values
  const [orderDetails, setOrderDetails] = useState({
    itemName: '',
    itemCode: '',
    quantity: '',
    companyName: '',
    payment: '',
    status: '',
  });

  // Effect to populate form when editing an order
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
    if (order && order._id) {
      dispatch(updateOrder({ id: order._id, updateData: orderDetails }));
      alert('Upated successfully')
    } else if (!order) {
      dispatch(addOrder(orderDetails));
    } else {
      console.error('Order ID is undefined. Cannot update order.');
    }
    
    onClose();
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
