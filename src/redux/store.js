import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import CustomerReducer from './CustomerSlice'; 
import OrderReducer from './OrderSlice';
import ProductReducer from './ProductSlice';
import SalesReducer from './SaleSlice';
import TaskReducer from './TaskSlice';
import TicketReducer from './TicketSlice';
import UserListReducer from './UserListSlice';
import ProfileReducer from './ProfileSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    customer: CustomerReducer,
    orders: OrderReducer,
    products: ProductReducer,
    sales: SalesReducer,
    tasks: TaskReducer,
    ticket: TicketReducer,
    userlist:UserListReducer,
    profile:ProfileReducer
  },
});
