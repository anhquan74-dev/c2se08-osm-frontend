import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import categoryReducer from '../modules/Admin/Category/categorySlice';
import customerReducer from '../modules/Admin/ManageCustomer/customerSlice';
import providerReducer from '../modules/Admin/ManageServiceProvider/providerSlice';
import counterReducer from '../modules/counter/counterSlice';
import providerCustomerReducer from '../modules/Customer/FindingProvider/providerCustomerSlice';
import dashboardReducer from '../modules/Admin/Dashboard/dashboardSlice';
import authReducer from '../modules/Auth/authSlice';

const persistConfig = {
  key: 'root',
  storage,
};
const rootReducer = combineReducers({
  // auth: authSlice.reducer,
  // notes: NotesReducer,
  counter: counterReducer,
  provider: providerReducer,
  customer: customerReducer,
  category: categoryReducer,
  providerCustomer: providerCustomerReducer,
  dashboard: dashboardReducer,
  auth: authReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
export const persistor = persistStore(store);
// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     provider: providerReducer,
//     customer: customerReducer,
//     category: categoryReducer,
//     providerCustomer: providerCustomerReducer,
//     dashboard: dashboardReducer,
//   },
// });
