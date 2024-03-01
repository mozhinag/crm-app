import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://server-crm-yowd.onrender.com/products';

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (prodData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/create-product`, prodData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/get-allproducts`);
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL}/update-product/${id}`, updateData); // Note the corrected URL
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Adjusted deleteProduct async thunk
export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL}/delete-product/${id}`); // Corrected URL
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const initialState= { list: [], isLoading: false, error: null };

const ProductSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(getProducts.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.list = action.payload.result;
        })
        .addCase(getProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        })
        .addCase(addProduct.fulfilled, (state, action) => {
          state.list.push(action.payload);
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
          const index = state.list.findIndex(product => product._id === action.payload._id); 
          if (index !== -1) {
            state.list[index] = action.payload; 
          }
        })
        
        .addCase(deleteProduct.fulfilled, (state, action) => {
          state.list = state.list.filter(product => product._id !== action.payload._id); 
        })
      } 
  });

  export default ProductSlice.reducer;
  