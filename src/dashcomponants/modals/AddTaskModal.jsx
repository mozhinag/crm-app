import React, {  useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateTask ,getTasks} from '../../redux/TaskSlice';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControl, InputLabel, Button, Select, MenuItem } from '@mui/material';

function AddTaskModal({ isOpen, onClose, task = null }) {
    const dispatch = useDispatch();
    // const [successMessage, setSuccessMessage] = useState('');
    // const [errorMessage, setErrorMessage] = useState('');


    const [taskDetails, setTaskDetails] = useState({

        taskName: '',
        dueDate: '',
        description: '',
        assignTo: '',
        status: '',
    });


    useEffect(() => {
        if (task) {
            setTaskDetails(task);
        } else {
            setTaskDetails({
                taskName: '',
                dueDate: '',
                description: '',
                assignTo: '',
                status: '',
            });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setTaskDetails({ ...taskDetails, [name]: value });
        console.log(taskDetails);
    };

    const handleSubmit = () => {

        // setSuccessMessage('');
        // setErrorMessage('');
      
        if (task && task._id) { 
          dispatch(updateTask({ id: task._id, updateData: taskDetails }))
            .unwrap()
            .then(() => {
            //   setSuccessMessage('task updated successfully.');
             
              dispatch(getTasks()).catch(error => {
                console.error('Failed to refresh task:', error);
                // setErrorMessage('Failed to refresh task. Please try again.');
              });
            })
            .catch(error => {
              console.error('Failed to update task:', error);
            //   setErrorMessage('Failed to update the task. Please try again.');
            })
            .finally(() => {
              onClose(); 
            });
        } else if (!task) { 
          dispatch(addTask(taskDetails))
            .unwrap()
            .then(() => {
            //   setSuccessMessage('task added successfully.');
            
              dispatch(getTasks()).catch(error => {
                console.error('Failed to refresh task:', error);
                // setErrorMessage('Failed to refresh task. Please try again.');
              });
            })
            .catch(error => {
              console.error('Failed to add task:', error);
            //   setErrorMessage('Failed to add the task. Please try again.');
            })
            .finally(() => {
              onClose(); 
            });
        } else {
          console.error('task ID is undefined. Cannot update task.');
        //   setErrorMessage('task ID is undefined. Cannot process the task.');
          onClose(); 
        }
      };
      
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>{task ? 'Edit Task' : 'Add New Task'}</DialogTitle>
            <DialogContent>
                <TextField margin="dense" name="taskName" label="Task Name" fullWidth value={taskDetails.taskName} onChange={handleChange} />
                <TextField margin="dense" name="dueDate" label="Due Date" type="date" fullWidth value={taskDetails.dueDate} onChange={handleChange} InputLabelProps={{ shrink: true, }} />
                <TextField margin="dense" name="description" label="Description" fullWidth value={taskDetails.description} onChange={handleChange} />
                <TextField margin="dense" name="assignTo" label="Assign to" fullWidth value={taskDetails.assignTo} onChange={handleChange} />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Status</InputLabel>
                    <Select name="status" value={taskDetails.status} onChange={handleChange} label="Status">
                        <MenuItem value="submitted">Submitted</MenuItem>
                        <MenuItem value="waiting">Waiting</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" variant="contained" onClick={onClose}>Cancel</Button>
                <Button color="secondary" variant="contained" onClick={handleSubmit}>{task ? 'Update' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddTaskModal;
