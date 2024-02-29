import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTicket, updateTicket,getTickets } from '../../redux/TicketSlice';

function AddTicketModal({ open, handleClose, ticket = null }) {
  const dispatch = useDispatch();
  // const [successMessage, setSuccessMessage] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  const [ticketDetails, setTicketDetails] = useState({
    ticketcode: '',
    subject: '',
    date: '',
    description: '',
    ticketstatus: '',
    status: '',
  });

  useEffect(() => {
    if (ticket) {
      setTicketDetails(ticket);
    }
      else {
        setTicketDetails({
          ticketcode: '',
          subject: '',
          date: '',
          description: '',
          ticketstatus: '',
            status: '',
        });
    }
  }, [ticket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketDetails({ ...ticketDetails, [name]: value });
  };

  const handleSubmit = () => {

    // setSuccessMessage('');
    // setErrorMessage('');
  
    if (ticket && ticket._id) {
      dispatch(updateTicket({ id: ticket._id, updateData: ticketDetails }))
        .unwrap()
        .then(() => {
          // setSuccessMessage('ticket updated successfully.');

          dispatch(getTickets()).catch(error => {
            console.error('Failed to refresh ticket:', error);
            // setErrorMessage('Failed to refresh ticket. Please try again.');
          });
        })
        .catch(error => {
          console.error('Failed to update ticket:', error);
          // setErrorMessage('Failed to update the ticket. Please try again.');
        })
        .finally(() => {
          handleClose();
        });
      } else if (!ticket) {
        dispatch(addTicket(ticketDetails))
        .unwrap()
        .then(() => {
          // setSuccessMessage('ticket added successfully.');

          dispatch(getTickets()).catch(error => {
            console.error('Failed to refresh ticket:', error);
            // setErrorMessage('Failed to refresh ticket. Please try again.');
          });
        })
        .catch(error => {
          console.error('Failed to add ticket:', error);
          // setErrorMessage('Failed to add the ticket. Please try again.');
        })
        .finally(() => {
          handleClose();
        });
    }
   
     else {
      console.error('task ID is undefined. Cannot update task.');
      // setErrorMessage('task ID is undefined. Cannot process the task.');
      handleClose(); 
    }
  };
  
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{ticket ? 'Edit Ticket' : 'Add New Ticket'}</DialogTitle>
      <DialogContent>
        <TextField margin="dense" name="ticketcode" label="Ticket Code" fullWidth value={ticketDetails.ticketcode} onChange={handleChange} />
        <TextField margin="dense" name="subject" label="Subject" fullWidth value={ticketDetails.subject} onChange={handleChange} />
        <TextField margin="dense" name="date" label="Date" type="date" fullWidth value={ticketDetails.date} onChange={handleChange} InputLabelProps={{ shrink: true }} />
        
        {/* Department Select */}
        <FormControl fullWidth margin="dense">
          <InputLabel>Description</InputLabel>
          <Select name="description" value={ticketDetails.description} onChange={handleChange} label="Description">
            <MenuItem value="Not Working">Not Working</MenuItem>
            <MenuItem value="Defective">Defective</MenuItem>
          </Select>
        </FormControl>
        
        {/* Ticket Status Select */}
        <FormControl fullWidth margin="dense">
          <InputLabel>Ticket Status</InputLabel>
          <Select name="ticketstatus" value={ticketDetails.ticketstatus} onChange={handleChange} label="Ticket Status">
            <MenuItem value="answered">Answered</MenuItem>
            <MenuItem value="in progress">In Progress</MenuItem>
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="close">Close</MenuItem>
          </Select>
        </FormControl>
        
        {/* Status Select */}
        <FormControl fullWidth margin="dense">
          <InputLabel>Status</InputLabel>
          <Select name="status" value={ticketDetails.status} onChange={handleChange} label="Status">
            <MenuItem value="booked">Booked</MenuItem>
            <MenuItem value="cancel">Cancel</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" variant="contained" onClick={handleClose}>Cancel</Button>
        <Button color="secondary" variant="contained" onClick={handleSubmit}>{ticket ? 'Update' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTicketModal;
