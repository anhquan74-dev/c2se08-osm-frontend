import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../modules/Admin/Category/categorySlice';
import customerReducer from '../modules/Admin/ManageCustomer/customerSlice';
import providerReducer from '../modules/Admin/ManageServiceProvider/providerSlice';
import counterReducer from '../modules/counter/counterSlice';
import providerCustomerReducer from '../modules/Customer/FindingProvider/providerCustomerSlice';
import dashboardReducer from '../modules/Admin/Dashboard/dashboardSlice';
import authReducer from '../modules/Auth/authSlice';
import manageServiceReducer from '../modules/ServiceProvider/ManageService/manageServiceSlice';
import blogReducer from '../modules/Admin/Blog/blogSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    provider: providerReducer,
    customer: customerReducer,
    category: categoryReducer,
    blog: blogReducer,
    providerCustomer: providerCustomerReducer,
    dashboard: dashboardReducer,
    auth: authReducer,
    manageService: manageServiceReducer,
  },
});
