import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, deleteTask} from '../redux/TaskSlice'; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { FaPlus } from "react-icons/fa";
import AddTaskModal from './modals/AddTaskModal';

function Task() {
  const dispatch = useDispatch();
  const [error,setError]=useState('');
  const tasks = useSelector((state) => state.tasks.list);
  console.log(tasks);
  console.log('Type of tasks:', typeof tasks);
  console.log('Is tasks an array?:', Array.isArray(tasks));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null); 

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleEditClick = (task) => {
    setEditingTask(task); 
    setIsModalOpen(true); 
  };
  const handleDeleteClick = (_id) => {
       
      
    dispatch(deleteTask(_id))
      .unwrap() 
      .then(() => {
       
        dispatch(getTasks())
          .catch((error) => {
          
            console.error('Failed to refresh Tasks list:', error);
            setError('Failed to refresh the Tasks list. Please try again.');
          });
        setError(''); 
        error('');
      })
      .catch((error) => {
      
        console.error('Failed to delete Tasks:', error);
        setError('Failed to delete the Tasks. Please try again.');
      });
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null); 
  };

  return (
    <div style={{
      width: '70%', // Adjust width as needed
      padding: '20px',
      borderRadius: '10px', // Optional: Adds rounded corners
      marginLeft: '90px',
      alignContent: 'center',
      marginTop: '80px',
      backgroundColor: 'pink' }}>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead style={{backgroundColor:'gray'}}>
           
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Task Name</TableCell>
                <TableCell> Due Date</TableCell>
                <TableCell>Description</TableCell>
              
                <TableCell> Assign to</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{task.taskName}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>{task.description}</TableCell>
                 
                  <TableCell>{task.assignTo}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(task)}>
                      <EditIcon style={{ color: 'blue', fontSize: '35px', border: '2px solid', padding: '5px', marginRight: '5px', cursor: 'pointer', backgroundColor: 'white', borderRadius: '5px' }}/>
                    </IconButton>
                    <IconButton onClick={() => (handleDeleteClick(task._id))}>
                      <DeleteIcon style={{ color: 'red', fontSize: '35px', border: '2px solid', padding: '5px', marginRight: '5px', cursor: 'pointer', backgroundColor: 'white', borderRadius: '5px' }}/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
       
        {isModalOpen && (
          <AddTaskModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            task={editingTask} // Pass the order to be edited to the modal
          />
        )}
      </Paper>
      <Button  color="secondary" variant="contained"  style={{ marginBottom: '20px', alignSelf: 'flex-end',marginTop:'20px' }} startIcon={<FaPlus />} onClick={() => { setIsModalOpen(true); setEditingTask(null); }}>
          Add Task 
        </Button>
    </div>
  );
}

export default Task;
