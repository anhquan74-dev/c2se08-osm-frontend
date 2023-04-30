import { configureStore } from '@reduxjs/toolkit';
import providerReducer from '../modules/Admin/ManageServiceProvider/providerSlice';
import counterReducer from '../modules/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    provider: providerReducer,
  },
});
