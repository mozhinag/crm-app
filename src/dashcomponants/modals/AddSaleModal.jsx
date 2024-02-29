import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addSale, updateSale,getSales } from '../../redux/SaleSlice';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button,FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function AddSaleModal({ isOpen, onClose, sale = null }) {
    const dispatch = useDispatch();
    // const [successMessage, setSuccessMessage] = useState('');
    // const [errorMessage, setErrorMessage] = useState('');
  

    const [saleDetails, setSaleDetails] = useState({

        itemName: '',
        price: '',
        qty: '',
        companyName: '',
        amount: '',
        entryDate: '',
        stage: '',
    });


    useEffect(() => {
        if (sale) {
            setSaleDetails(sale);
        } else {
            setSaleDetails({
                itemName: '',
                price: '',
                qty: '',
                companyName: '',
                amount: '',
                entryDate: '',
                stage: '',
            });
        }
    }, [sale]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setSaleDetails({ ...saleDetails, [name]: value });
        console.log(saleDetails);
    };

    const handleSubmit = () => {

        // setSuccessMessage('');
        // setErrorMessage('');
      
        if (sale) {
            dispatch(updateSale({ id: sale._id, updateData: saleDetails }))
                .unwrap()
                .then(() => {
                    // setSuccessMessage('Sale updated successfully.');
                    dispatch(getSales()).catch(error => {
                        console.error('Failed to refresh sale:', error);
                        // setErrorMessage('Failed to refresh sale. Please try again.');
                    });
                })
                .catch(error => {
                    console.error('Failed to update sale:', error);
                    // setErrorMessage('Failed to update the sale. Please try again.');
                })
                .finally(() => {
                    onClose();
                });
       
        } else if (!sale) { 
          dispatch(addSale(saleDetails))
            .unwrap()
            .then(() => {
            //   setSuccessMessage('sale added successfully.');
            
              dispatch(getSales()).catch(error => {
                console.error('Failed to refresh sale:', error);
                // setErrorMessage('Failed to refresh sale. Please try again.');
              });
            })
            .catch(error => {
              console.error('Failed to add sale:', error);
            //   setErrorMessage('Failed to add the sale. Please try again.');
            })
            .finally(() => {
              onClose(); 
            });
        } else {
          console.error('sale ID is undefined. Cannot update sale.');
        //   setErrorMessage('sale ID is undefined. Cannot process the sale.');
          onClose(); 
        }
      };
      
    
      
    
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>{sale ? 'Edit Sale' : 'Add New Sale'}</DialogTitle>
            <DialogContent>
                <TextField margin="dense" name="itemName" label="Item Name" fullWidth value={saleDetails.itemName} onChange={handleChange} />
                <TextField margin="dense" name="price" label="Price" fullWidth value={saleDetails.price} onChange={handleChange} />
                <TextField margin="dense" name="qty" label="Qty" fullWidth value={saleDetails.qty} onChange={handleChange} />
                <TextField margin="dense" name="companyName" label="Company Name" fullWidth value={saleDetails.companyName} onChange={handleChange} />
                <TextField margin="dense" name="amount" label="Amount" type="number" fullWidth value={saleDetails.amount} onChange={handleChange} />
                <TextField margin="dense" name="entryDate" label="Entry Date" type="date" fullWidth value={saleDetails.entryDate} onChange={handleChange} InputLabelProps={{ shrink: true, }} />
                <FormControl fullWidth margin="dense">
            <InputLabel>Stage</InputLabel>
            <Select
                label="Stage"
                name="stage"
                value={saleDetails.stage}
                onChange={handleChange}
                fullWidth
            >
                <MenuItem value="Draft">Draft</MenuItem>
                <MenuItem value="Cheque">Cheque</MenuItem>
                <MenuItem value="Net Banking">Net Banking</MenuItem>
            </Select>
        </FormControl>            </DialogContent>
            <DialogActions>
                <Button color="secondary" variant="contained" onClick={onClose}>Cancel</Button>
                <Button color="secondary" variant="contained" onClick={handleSubmit}>{sale ? 'Update' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddSaleModal;
