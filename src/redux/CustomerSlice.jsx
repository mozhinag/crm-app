import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://server-crm-yowd.onrender.com/customer';

export const createCustomer = createAsyncThunk(
  'customer/createCustomer',
  async (customerData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/create-customer`, customerData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCustomers = createAsyncThunk(
  'customer/getCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/all-customers`);
      // Assuming response.data returns an array of customers
      // You would adjust the logic here based on your actual data structure
      const data = response.data;
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCustomer = createAsyncThunk(
  'customer/updateCustomer',
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/update-customer/${id}`, updateData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  'customer/deleteCustomer',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete-customer/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const CustomerSlice = createSlice({
  name: 'customer',
  initialState: {
    customers: [],
    details: {
      totalCustomers: 0,
      activeCustomers: 0,
      inactiveCustomers: 0,
      vipCustomers: 0,
      vendors: 0,
      regularCustomers: 0,
    },
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers.push(action.payload);
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'Could not create customer';
      })
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers = action.payload;

      

        state.details.totalCustomers = action.payload.length;
        state.details.activeCustomers = action.payload.filter(c => c.status === "Active" ).length;
        state.details.inactiveCustomers = action.payload.length - state.details.activeCustomers 

        state.details.vipCustomers = action.payload.filter(c => c.customerType.toLowerCase() === 'vip').length;
        state.details.vendors = action.payload.filter(c => c.customerType.toLowerCase() === 'vendor').length;
        state.details.regularCustomers = action.payload.filter(c => c.customerType.toLowerCase() === 'regular').length;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'Could not fetch customers';
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const index = state.customers.findIndex(customer => customer._id === action.payload._id);
        if (index !== -1) {
          state.customers[index] = { ...state.customers[index], ...action.payload };
        }
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter(customer => customer._id !== action.payload._id);
       
      });
  },
});

export const { reset } = CustomerSlice.actions;
export default CustomerSlice.reducer;
