// In your redux slice file, e.g., OrderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://server-crm-yowd.onrender.com/tasks';

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (taskData, { rejectWithValue }) => {
    try {
      console.log(taskData);
      const response = await axios.post(`${BASE_URL}/create-tasks`, taskData);
      console.log(response.data);
      return response.data;

    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk for fetching orders
export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/get-alltasks`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      console.log(id);
      const response = await axios.put(`${BASE_URL}/update-tasks/${id}`, updateData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete-tasks/${id}`);
      return response.data; // Return the deleted order's id
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const initialState = {
  list: [],
  isLoading: false,
  error: null,
  totalTasks: 0,
  assignedTasks: 0,
  unassignedTasks: 0,
};

const TaskSlice = createSlice({
  name: 'tasks',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
        state.totalTasks = action.payload.length;
        state.assignedTasks = action.payload.filter(task => task.status === 'submitted').length;
        state.unassignedTasks = action.payload.length - state.assignedTasks;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.list.push(action.payload);

      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.list.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {

          state.list[index] = { ...state.list[index], ...action.payload };


        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.list.findIndex(task => task.id === action.payload);

      });
  }
});

// export const { setTask} = TaskSlice.actions;
export default TaskSlice.reducer;
