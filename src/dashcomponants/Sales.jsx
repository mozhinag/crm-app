import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSales, deleteSale } from '../redux/SaleSlice'; // Adjust the import path
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { FaPlus } from "react-icons/fa";
import AddSaleModal from './modals/AddSaleModal';


function Sales() {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.sales.list);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSale, setEditingSale] = useState(null); 

  useEffect(() => {
    dispatch(getSales());
  }, [dispatch]);

  const handleEditClick = (sale) => {
    setEditingSale(sale); 
    setIsModalOpen(true); 
  };
const handleDeleteClick =(_id)=>{
    dispatch(deleteSale(_id));
}
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSale(null); 
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
            <TableHead style={{backgroundColor:'gray'}}>
           
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell> Entry Date</TableCell>
                <TableCell> Stage</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.map((sale, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{sale.itemName}</TableCell>
                  <TableCell>{sale.price}</TableCell> 
                   <TableCell>{sale.qty}</TableCell>
                  <TableCell>{sale.companyName}</TableCell>
                  <TableCell>{sale.amount}</TableCell>
                 
                  <TableCell>{sale.entryDate}</TableCell>
                  <TableCell>{sale.stage}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(sale)}>
                      <EditIcon style={{ color: 'blue', fontSize: '35px', border: '2px solid', padding: '5px', marginRight: '5px', cursor: 'pointer', backgroundColor: 'white', borderRadius: '5px' }}/>
                    </IconButton>
                    <IconButton onClick={() => (handleDeleteClick(sale._id))}>
                      <DeleteIcon style={{ color: 'red', fontSize: '35px', border: '2px solid', padding: '5px', marginRight: '5px', cursor: 'pointer', backgroundColor: 'white', borderRadius: '5px' }}/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
       
        {isModalOpen && (
          <AddSaleModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            sale={editingSale} // Pass the order to be edited to the modal
          />
        )}
      </Paper>
      <Button  color="secondary" variant="contained" style={{ marginBottom: '20px', alignSelf: 'flex-end',marginTop:'20px' }}  startIcon={<FaPlus />} onClick={() => { setIsModalOpen(true); setEditingSale(null); }}>
          Add Sale Details
        </Button>
    </div>
  );
}

export default Sales;
