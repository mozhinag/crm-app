import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/profile';

export const createProfile = createAsyncThunk(
  'profile/createProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/create-profile`, profileData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/all-profile`);
     
      const data = response.data;
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/update-profile/${id}`, updateData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


const initialState = {
  profile: null,
  profiles: [], 
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
 
  extraReducers: (builder) => {
    // Handle createProfile
    builder.addCase(createProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload; // Assuming the API returns the newly created profile
    });
    builder.addCase(createProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Handle getProfile
    builder.addCase(getProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profiles = action.payload; // Assuming the API returns an array of profiles
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Handle updateProfile
    builder.addCase(updateProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
     
      const index = state.profiles.findIndex(profile => profile.id === action.payload.id);
      if (index !== -1) {
        state.profiles[index] = action.payload;
      }
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});



// Export the reducer
export default profileSlice.reducer;
