import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://server-crm-yowd.onrender.com/tickets';

export const addTicket = createAsyncThunk(
    'tickets/addTicket',
    async (ticketdata, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/create-ticket`, ticketdata);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    })

    export const getTickets = createAsyncThunk(
        'tickets/getTickets',
        async (_, { rejectWithValue }) => {
            try {
                const response = await axios.get(`${BASE_URL}/get-alltickets`);
                return response.data;
            } catch (error) {
                return rejectWithValue(error.response.data);
            }
        })
        export const updateTicket = createAsyncThunk(
            'tickets/updateTicket',
            async ({ id, updateData }, { rejectWithValue }) => {
                try {
                    const response = await axios.put(`${BASE_URL}/update-ticket/${id}`, updateData);
                    return response.data;
                } catch (error) {
                    return rejectWithValue(error.response.data);
                }
            })

            export const deleteTickets = createAsyncThunk(
                'tickets/deleteTickets',
                async (id, { rejectWithValue }) => {
                    try {
                        const response = await axios.delete(`${BASE_URL}/delete-ticket/${id}`);
                        return response.data;
                    } catch (error) {
                        return rejectWithValue(error.response.data);
                    }
                })
                const initialState = {
                    tickets: [],
                    isLoading: false,
                    error: null,
                };
                
                const ticketSlice = createSlice({
                    name: 'ticket',
                    initialState,
                   
                    extraReducers: (builder) => {
                        builder
                            // Handle getTickets async thunk
                            .addCase(getTickets.pending, (state) => {
                                state.isLoading = true;
                            })
                            .addCase(getTickets.fulfilled, (state, action) => {
                                state.isLoading = false;
                                state.tickets = action.payload;
                                state.error = null;
                            })
                            .addCase(getTickets.rejected, (state, action) => {
                                state.isLoading = false;
                                state.error = action.payload;
                            })
                            // Handle addTicket async thunk
                            .addCase(addTicket.pending, (state) => {
                                state.isLoading = true;
                            })
                            .addCase(addTicket.fulfilled, (state, action) => {
                                state.isLoading = false;
                                state.tickets.push(action.payload);
                                state.error = null;
                            })
                            .addCase(addTicket.rejected, (state, action) => {
                                state.isLoading = false;
                                state.error = action.payload;
                            })
                            // Handle updateTicket async thunk
                            .addCase(updateTicket.pending, (state) => {
                                state.isLoading = true;
                            })
                            .addCase(updateTicket.fulfilled, (state, action) => {
                                state.isLoading = false;
                                const index = state.tickets.findIndex(ticket => ticket.id === action.payload.id);
                                if (index !== -1) {
                                    state.tickets[index] = action.payload;
                                }
                                state.error = null;
                            })
                            .addCase(updateTicket.rejected, (state, action) => {
                                state.isLoading = false;
                                state.error = action.payload;
                            })
                            // Handle deleteTicket async thunk
                            .addCase(deleteTickets.pending, (state) => {
                                state.isLoading = true;
                            })
                            .addCase(deleteTickets.fulfilled, (state, action) => {
                                state.isLoading = false;
                                state.tickets = state.tickets.filter(ticket => ticket.id !== action.payload);
                                state.error = null;
                            })
                            .addCase(deleteTickets.rejected, (state, action) => {
                                state.isLoading = false;
                                state.error = action.payload;
                            });
                    },
                });
                
           
                export const { setTicket } = ticketSlice.actions;
                
               
                export default ticketSlice.reducer;
                


