// In your redux slice file, e.g., OrderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/orders';

export const addOrder = createAsyncThunk(
  'orders/addOrder',
  async (orderData, { rejectWithValue }) => {
    try {
        console.log(orderData); 
      const response = await axios.post(`${BASE_URL}/create-order`, orderData);
      console.log(response.data);
      return response.data; 
    
      // Assuming the API responds with the added order data
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk for fetching orders
export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/get-allorders`);
      console.log('API response for getOrders:', response.data);
      return response.data;
    } catch (err) {
      console.error('Error fetching orders:', err); 
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
        console.log(id);
      const response = await axios.put(`${BASE_URL}/update-order/${id}`, updateData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete-order/${id}`);
      return response.data; // Return the deleted order's id
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const initialState= { list: [],totalOrders:0 ,isLoading: false, error: null };
const OrderSlice = createSlice({
  name: 'orders',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload.orders; 
       state.totalOrders = action.payload.orders.length;
        
    })
    
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.list.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = { ...state.list[index], ...action.payload };
        }
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const deletedOrderId = action.payload.id;
        state.list = state.list.filter(order => order.id !== deletedOrderId);
      });
      
  }
});

export default OrderSlice.reducer;
