import { configureStore } from '@reduxjs/toolkit';
import providerReducer from '../modules/Admin/ManageServiceProvider/providerSlice';
import counterReducer from '../modules/counter/counterSlice';
import customerReducer from '../modules/Admin/ManageCustomer/customerSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    provider: providerReducer,
    customer: customerReducer,
  },
});
