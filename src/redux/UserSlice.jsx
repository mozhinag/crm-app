import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
    'user/register',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await fetch('https://server-crm-yowd.onrender.com/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        let data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Could not register user');
        }
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


// Async thunk for user login
export const loginUser = createAsyncThunk(
    'user/login',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://server-crm-yowd.onrender.com/auth/login', userData);
            
        
            localStorage.setItem('token', response.data.token);
            
           
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
               
            }
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {
            username: null,
            email: null,
            role: null,
        },
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
    },
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
            state.userInfo = { username: null, email: null, role: null };
        },
        logoutAction: (state) => {
            state.user = null; 
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userInfo = { ...action.payload, password: undefined }; 
            })
           
    
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userInfo = action.payload.user; 
    })
    
   
.addCase(loginUser.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message =  action.payload ? action.payload.message:'incorrect username and password'  
})
.addCase(registerUser.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
  
    state.message = action.payload ? action.payload.message : 'An error occurred during registration';
})

},
});

export const { reset, logoutAction } = userSlice.actions;
export default userSlice.reducer;
