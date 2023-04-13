import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../modules/counter/counterSlice';
import customerReducer from '../modules/Admin/ManageCustomer/customerSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    customer: customerReducer,
  },
});
