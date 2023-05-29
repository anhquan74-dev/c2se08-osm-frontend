import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import customerApi from '../../../api/customerApi';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '../../../utils/constants';

export const getCustomers = createAsyncThunk('customers/getCustomers', async (request, thunkAPI) => {
  const res = await customerApi.getAll(request);
  return res;
});

// export const getCustomerId = createAsyncThunk('customers/getCustomerId', async (customerId, { dispatch }) => {

// });

// export const postAddCustomer = createAsyncThunk('customers/postAddCustomer', async (customer, { dispatch }) => {

// });

// export const postUpdateCustomer = createAsyncThunk('customers/postUpdateCustomer', async (customer, { dispatch }) => {

// });

export const postDeleteCustomer = createAsyncThunk('customers/postDeleteCustomer', async (customer, { dispatch }) => {
  const res = await customerApi.update(customer);
  dispatch(getCustomers({ page: PAGE_DEFAULT, limit: LIMIT_DEFAULT }));
  return res;
});

//setup state
const initialState = {
  loading: false,
  list: [],
  conditions: {
    page: PAGE_DEFAULT,
    limit: LIMIT_DEFAULT,
  },
};
export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setConditions(state, action) {
      state.conditions = action.payload;
    },
  },
  extraReducers: (builder) => {
    //set get all customer
    builder.addCase(getCustomers.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getCustomers.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(getCustomers.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

//actions
export const customerActions = customerSlice.actions;

//selectors

//reducer
const customerReducer = customerSlice.reducer;
export default customerReducer;
