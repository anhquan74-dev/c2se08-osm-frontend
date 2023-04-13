import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import customerApi from '../../../api/customerApi';

export const getCustomers = createAsyncThunk('customers/getCustomers', async (thunkAPI) => {
  //call api
  const res = await customerApi.getAll();
  return res.data;
});

export const getCustomerId = createAsyncThunk('customers/getCustomerId', async (customerId, { dispatch }) => {
  const response = await fetch(`https://5adc8779b80f490014fb883.mockapi.io/customers/${customerId}`).then((data) =>
    data.json()
  );
  const finalPayload = response;
  //dispatch(someOtherAction())
  return finalPayload; // will dispatch `fulfilled` action
});

export const postAddCustomer = createAsyncThunk('customers/postAddCustomer', async (customer, { dispatch }) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customer),
  };
  const response = await fetch(`https://5adc8779b80f490014fb883.mockapi.io/customers`, requestOptions).then((data) =>
    data.json()
  );
  const finalPayload = response;
  return finalPayload;
});

export const postUpdateCustomer = createAsyncThunk('customers/postUpdateCustomer', async (customer, { dispatch }) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customer),
  };
  const response = await fetch(
    `https://5adc8779b80f490014fb883.mockapi.io/customers/${customer.id}`,
    requestOptions
  ).then((data) => data.json());
  const finalPayload = response;
  return finalPayload;
});

export const postDeleteCustomer = createAsyncThunk('customers/postDeleteCustomer', async (customer, { dispatch }) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customer),
  };
  const response = await fetch(
    `https://5adc8779b80f490014fb883.mockapi.io/customers/${customer.id}`,
    requestOptions
  ).then((data) => data.json());
  const finalPayload = response;
  return finalPayload;
});

//setup state
const initialState = {
  loading: false,
  customers: [],
  isFetchCustomerID: false,
  customer: {},
};
export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: {
    //set get all customer
    [getCustomers.pending]: (state) => {
      state.loading = true;
    },
    [getCustomers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.customers = payload;
    },
    [getCustomers.rejected]: (state) => {
      state.loading = false;
    },

    //set get customer Id
    [getCustomerId.pending]: (state) => {
      state.isFetchCustomerID = true;
    },
    [getCustomerId.fulfilled]: (state, { payload }) => {
      state.isFetchCustomerID = false;
      state.customer = payload;
    },
    [getCustomerId.rejected]: (state) => {
      state.isFetchCustomerID = false;
    },

    //set post Customer
    [postAddCustomer.fulfilled]: (state, { payload }) => {
      state.customers.push(payload);
    },

    //set update Customer
    [postUpdateCustomer.fulfilled]: (state, { payload }) => {
      const index = state.customers.findIndex((customer) => customer.id === payload.id);
      //console.log(index)
      // console.log(payload)
      state.customers[index] = payload;
    },

    //set delete Customer
    [postDeleteCustomer.fulfilled]: (state, { payload }) => {
      const index = state.customers.findIndex((customer) => customer.id === payload.id);
      state.customers.splice(index, 1);
    },
  },
});

//actions

//selectors

//reducer
const customerReducer = customerSlice.reducer;
export default customerReducer;
