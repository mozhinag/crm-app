import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTickets, getTickets } from '../redux/TicketSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { FaPlus } from "react-icons/fa";


import AddTicketModal from './modals/AddTicketModal';




function Tickets() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const dispatch = useDispatch();
    const tickets = useSelector((state) => state.ticket.tickets);
    const [error,setError]=useState('');
    useEffect(() => {
        dispatch(getTickets());
    }, [dispatch]);

    const handleOpenEditModal = (ticket) => {
        setSelectedTicket(ticket);
        console.log(ticket);
        setEditModalOpen(true);
    };
    const handleDeleteClick = (_id) => {
    dispatch(deleteTickets(_id))
    .unwrap() 
    .then(() => {
     
      dispatch(getTickets())
        .catch((error) => {
        
          console.error('Failed to refresh Tickets list:', error);
          setError('Failed to refresh the Tickets list. Please try again.');
        });
      setError(''); 
    })
    .catch((error) => {
    
      console.error('Failed to delete Tickets:', error);
      setError('Failed to delete the Tickets. Please try again.');
    });
};
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
  

    return (
        <>


            <div style={{
            width: '70%', 
            padding: '20px',
            borderRadius: '10px', 
            marginLeft: '90px',
            alignContent: 'center',
            marginTop: '80px',
            backgroundColor: 'pink' }}>
                <Button
                    color="secondary" variant="contained"
                    style={{ marginBottom: '20px', alignSelf: 'flex-end' }}
                    onClick={handleOpenModal}>
                    <FaPlus style={{ marginRight: '8px' }} /> Add Ticket
                </Button>
                <TableContainer component={Paper} style={{ maxWidth: '100%' }}>
                    <Table  className="table" >
                        <TableHead   style={{backgroundColor:'gray'}}>
                            <TableRow >
                                <TableCell>S.No</TableCell>
                                <TableCell>Ticket Code</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell>Date</TableCell>

                                <TableCell>Description</TableCell>
                                <TableCell>Ticket Status</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets.map((ticket, index) => (
                                
                                    <TableRow key={ticket.id || index}>
                                        <TableCell component="th" scope="row">{index + 1}</TableCell>
                                        <TableCell>{ticket.ticketcode} </TableCell>
                                        <TableCell>{ticket.subject}</TableCell>
                                        <TableCell>{ticket.date}</TableCell>
                                        <TableCell>{ticket.description}</TableCell>
                                        <TableCell>{ticket.ticketstatus}</TableCell>
                                        <TableCell>{ticket.status}</TableCell>
                                        <TableCell>
                                            <IconButton aria-label="edit" onClick={() => handleOpenEditModal(ticket)}>
                                                <EditIcon style={{ color: 'blue', fontSize: '35px', border: '2px solid', padding: '5px', marginRight: '5px', cursor: 'pointer', backgroundColor: 'white', borderRadius: '5px' }} />
                                            </IconButton>
                                            <IconButton aria-label="delete" onClick={() => handleDeleteClick(ticket._id)}>
                                                <DeleteIcon style={{ color: 'red', fontSize: '35px', border: '2px solid', padding: '5px', marginRight: '5px', cursor: 'pointer', backgroundColor: 'white', borderRadius: '5px' }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
              ))}
                                </TableBody>
          </Table>
                </TableContainer>
                <AddTicketModal open={isModalOpen} handleClose={handleCloseModal} />
                <AddTicketModal open={editModalOpen} handleClose={() => setEditModalOpen(false)} ticket={selectedTicket} />

            </div>
        </>
    );
}

export default Tickets;
