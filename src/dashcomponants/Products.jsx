import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct } from '../redux/ProductSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { FaPlus } from "react-icons/fa";
import AddProductModal from './modals/AddProductModal'; // Ensure the file name matches

function Products() {
    const dispatch = useDispatch();
    
    const products = useSelector((state) => state.products.list);
//    const [error,setError]=useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (_id) => {
       
      
        dispatch(deleteProduct(_id))
          .unwrap() 
          .then(() => {
           
            dispatch(getProducts())
              .catch((error) => {
              
                console.error('Failed to refresh Products list:', error);
                // setError('Failed to refresh theProducts list. Please try again.');
              });
            // setError(''); 
          })
          .catch((error) => {
          
            console.error('Failed to delete Product:', error);
            // setError('Failed to delete the Product. Please try again.');
          });
      };
      
      

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
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
                                <TableCell>Item Code</TableCell>
                                <TableCell>Item Name</TableCell>
                                <TableCell>Item Category</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Unit Price</TableCell>
                                <TableCell>Discount</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product, index) => (
                                <TableRow key={product.id || index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{product.code}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell>{product.unitPrice}</TableCell>
                                    <TableCell>{product.discount}</TableCell>
                                    <TableCell>{product.status}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEditClick(product)}>
                                            <EditIcon style={{ color: 'blue', fontSize: '35px', border: '2px solid', padding: '5px', marginRight: '5px', cursor: 'pointer', backgroundColor: 'white', borderRadius: '5px' }} />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteClick(product._id)}>
                                            <DeleteIcon style={{ color: 'red', fontSize: '35px', border: '2px solid', padding: '5px', marginRight: '5px', cursor: 'pointer', backgroundColor: 'white', borderRadius: '5px' }}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
               
                {isModalOpen && (
                    <AddProductModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        product={editingProduct}
                    />
                )}
            </Paper>
            <Button color="secondary" variant="contained"style={{ marginBottom: '20px', alignSelf: 'flex-end',marginTop:'20px' }}  startIcon={<FaPlus />} onClick={() => { setIsModalOpen(true); setEditingProduct(null); }}>
                    Add Product
                </Button>
        </div>
    );
}

export default Products;
