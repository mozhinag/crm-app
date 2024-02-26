// In your redux slice file, e.g., OrderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/userlist';

export const addUserlist = createAsyncThunk(
  'userlist/addUserlist',
  async (userlistData, { rejectWithValue }) => {
    try {
        console.log(userlistData); 
      const response = await axios.post(`${BASE_URL}/create-userlist`, userlistData);
      console.log(response.data);
      return response.data; 
    
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk for fetching orders
export const getUserlist = createAsyncThunk(
  'userlist/getUserlist',
  async (_, { rejectWithValue }) =>{
    try {
      const response = await axios.get(`${BASE_URL}/get-alluserlist`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserlist = createAsyncThunk(
  'userlist/updateUserlist',
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
        console.log(id);
      const response = await axios.put(`${BASE_URL}/update-userlist/${id}`, updateData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteUserlist = createAsyncThunk(
  'userlist/deleteUserlist',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete-userlist/${id}`);
      return response.data; // Return the deleted order's id
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const  initialState = { list: [], isLoading: false, error: null }

const UserListSlice = createSlice({
  name: 'userlist',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload.result;
      })
      .addCase(getUserlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addUserlist.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateUserlist.fulfilled, (state, action) => {
        const index = state.list.findIndex(userlist => userlist.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = { ...state.list[index], ...action.payload };
        }
      })
      .addCase(deleteUserlist.fulfilled, (state, action) => {
        state.list = state.list.filter(userlist => userlist.id !== action.payload); 
      });
  }
});
export const { setUserList} = UserListSlice.actions;
export default UserListSlice.reducer;
