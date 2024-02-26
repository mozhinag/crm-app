// In your redux slice file, e.g., OrderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://server-crm-yowd.onrender.com/sales';

export const addSale = createAsyncThunk(
  'sales/addSale',
  async (saleData, { rejectWithValue }) => {
    try {
      console.log(saleData);
      const response = await axios.post(`${BASE_URL}/create-sales`, saleData);
      console.log(response.data);
      return response.data;

    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk for fetching orders
export const getSales = createAsyncThunk(
  'sales/getSales',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/get-allsales`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateSale = createAsyncThunk(
  'sales/updateSale',
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      console.log(id);
      const response = await axios.put(`${BASE_URL}/update-sales/${id}`, updateData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteSale = createAsyncThunk(
  'sales/deleteSale',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete-sales/${id}`);
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
  totalSoldProducts: 0,
  totalIncome: 0,
  Draft: 0,
  Cheque: 0,
  NetBanking: 0,

};

const SaleSlice = createSlice({
  name: 'sales',
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(getSales.fulfilled, (state, action) => {
      state.isLoading = false;
      const salesData = Array.isArray(action.payload.result) ? action.payload.result : [];
  
      state.list = salesData;
      state.totalSoldProducts = salesData.length;
      state.totalIncome = salesData.reduce((acc, sale) => acc + Number(sale.amount || 0), 0);
  
     
      state.Draft = salesData.filter(sale => (sale.stage || '').trim().toLowerCase() === "draft").length;
      state.Cheque = salesData.filter(sale => (sale.stage || '').trim().toLowerCase() === "cheque").length;
      state.NetBanking = salesData.filter(sale => (sale.stage || '').trim().toLowerCase() === "net banking").length;
  })
  
    


      .addCase(getSales.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addSale.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateSale.fulfilled, (state, action) => {
        const index = state.list.findIndex(sale => sale.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = { ...state.list[index], ...action.payload };
        }
      })
      .addCase(deleteSale.fulfilled, (state, action) => {
        state.list = state.list.filter(sale => sale.id !== action.payload);
      });
  }
});

export default SaleSlice.reducer;
