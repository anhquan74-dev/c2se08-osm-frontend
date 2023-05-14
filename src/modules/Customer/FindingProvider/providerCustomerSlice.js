import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import providerApi from '../../../api/providerApi';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '../../../utils/constants';
import packageApi from '../../../api/packageApi';

export const getProviders = createAsyncThunk('providerCustomer/getProviders', async (request, thunkAPI) => {
  const res = await providerApi.getAll(request);
  return res;
});

export const getPackages = createAsyncThunk('providerCustomer/getPackages', async (request, thunkAPI) => {
  const res = await packageApi.getAll(request);
  return res;
});

export const getProviderById = createAsyncThunk('providerCustomer/getProviderById', async (request, thunkAPI) => {
  const res = await providerApi.get(request);
  return res;
});

// export const getProviderId = createAsyncThunk('providers/getProviderId', async (providerId, { dispatch }) => {

// });

// export const postAddProvider = createAsyncThunk('providers/postAddProvider', async (provider, { dispatch }) => {

// });

// export const postUpdateProvider = createAsyncThunk('providers/postUpdateProvider', async (provider, { dispatch }) => {

// });

//setup state
const initialState = {
  loading: false,
  providerList: [],
  packageList: [],
  provider: null,
  services: null,
  conditions: {
    sort: [
      {
        sort_by: 'avg_star',
        sort_dir: 'desc',
      },
    ],
    page: PAGE_DEFAULT,
    limit: 12,
  },
};
export const providerCustomerSlice = createSlice({
  name: 'providerCustomer',
  initialState,
  reducers: {
    setConditions(state, action) {
      state.conditions = action.payload;
    },
  },
  extraReducers: (builder) => {
    //set get all provider
    builder.addCase(getProviders.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getProviders.fulfilled, (state, action) => {
      state.loading = false;
      state.providerList = action.payload;
    });

    builder.addCase(getProviders.rejected, (state, action) => {
      state.loading = false;
    });

    //set get all packages
    builder.addCase(getPackages.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getPackages.fulfilled, (state, action) => {
      state.loading = false;
      state.packageList = action.payload;
    });

    builder.addCase(getPackages.rejected, (state, action) => {
      state.loading = false;
    });

    //set get provider by id
    builder.addCase(getProviderById.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getProviderById.fulfilled, (state, action) => {
      state.loading = false;
      state.provider = action.payload.data;
      state.services = action.payload.data.service;
    });

    builder.addCase(getProviderById.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

//actions
export const providerCustomerActions = providerCustomerSlice.actions;

//selectors

//reducer
const providerCustomerReducer = providerCustomerSlice.reducer;
export default providerCustomerReducer;
