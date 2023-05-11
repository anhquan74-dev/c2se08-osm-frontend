import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../modules/Admin/Category/categorySlice';
import customerReducer from '../modules/Admin/ManageCustomer/customerSlice';
import providerReducer from '../modules/Admin/ManageServiceProvider/providerSlice';
import counterReducer from '../modules/counter/counterSlice';
import providerCustomerReducer from '../modules/Customer/FindingProvider/providerCustomerSlice';
import dashboardReducer from '../modules/Admin/Dashboard/dashboardSlice';
import authReducer from '../modules/Auth/authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    provider: providerReducer,
    customer: customerReducer,
    category: categoryReducer,
    providerCustomer: providerCustomerReducer,
    dashboard: dashboardReducer,
    auth: authReducer,
  },
});
