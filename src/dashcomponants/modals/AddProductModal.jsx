import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../../redux/ProductSlice';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, MenuItem, FormControl, Select, InputLabel } from '@mui/material';

function AddproductModal({ isOpen, onClose, product = null }) {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [productDetails, setproductDetails] = useState({

    code: '',
    name: '',
    category: '',
    quantity: '',
    description: '',
    unitPrice: '',
    discount: '',
    status: '',
  });


  useEffect(() => {
    if (product) {
      setproductDetails({
        code: product.code || '',
        name: product.name || '',
        category: product.category || '',
        quantity: product.quantity || '',
        description: product.description || '',
        unitPrice: product.unitPrice || '',
        discount: product.discount || '',
        status: product.status || '',
      });
    } else {
      setproductDetails({
        code: '',
        name: '',
        category: '',
        quantity: '',
        description: '',
        unitPrice: '',
        discount: '',
        status: '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setproductDetails({ ...productDetails, [name]: value });
    console.log(productDetails);
  };

  const handleSubmit = () => {
 
    setSuccessMessage('');
    setErrorMessage('');
  
    let dispatchOperation;
    if (product && product._id) { 
      dispatchOperation = dispatch(updateProduct({ id: product._id, updateData: productDetails }));
    } else { 
      dispatchOperation = dispatch(addProduct(productDetails));
    }
  
    dispatchOperation
      .unwrap() 
      .then(() => {
        setSuccessMessage(product && product._id ? 'Product updated successfully.' : 'Product added successfully.');
        
      })
      .catch(error => {
        console.error('Operation failed:', error);
        setErrorMessage('Operation failed. Please try again.');
      })
      .finally(() => {
        onClose();
      });
  };
  


  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
      <DialogContent>
        <TextField margin="dense" name="code" label="Item Code" fullWidth value={productDetails.code} onChange={handleChange} />
        <TextField margin="dense" name="name" label="Item Name" fullWidth value={productDetails.name} onChange={handleChange} />
        <TextField margin="dense" name="category" label="Item Category" fullWidth value={productDetails.category} onChange={handleChange} />
        <TextField margin="dense" name="quantity" label="Quantity" fullWidth value={productDetails.quantity} onChange={handleChange} />
        <TextField margin="dense" name="description" label="Description" fullWidth value={productDetails.description} onChange={handleChange} />
        <TextField margin="dense" name="unitPrice" label=" Unit Price" fullWidth value={productDetails.unitPrice} onChange={handleChange} />
        <TextField margin="dense" name="discount" label=" Discount" fullWidth value={productDetails.discount} onChange={handleChange} />

        <FormControl fullWidth margin="dense">
          <InputLabel>Status</InputLabel>
          <Select name="status" value={productDetails.status} onChange={handleChange} label="Status">
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="unavailable">Unavailable</MenuItem>
          </Select>
        </FormControl>      </DialogContent>
      <DialogActions>
        <Button color="secondary" variant="contained" onClick={onClose}>Cancel</Button>
        <Button color="secondary" variant="contained" onClick={handleSubmit}>{product ? 'Update' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddproductModal;
