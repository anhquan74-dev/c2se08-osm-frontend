import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dashboardApi from '../../../api/dashboardApi';

export const getTotalProviders = createAsyncThunk('dashboards/getTotalProviders', async () => {
  const res = await dashboardApi.getTotalProviders();
  return res;
});
export const getTotalCustomers = createAsyncThunk('dashboards/getTotalCustomers', async () => {
  const res = await dashboardApi.getTotalCustomers();
  return res;
});

export const getTotalServices = createAsyncThunk('dashboards/getTotalServices', async () => {
  const res = await dashboardApi.getTotalServices();
  return res;
});

export const getTotalPosts = createAsyncThunk('dashboards/getTotalPosts', async () => {
  const res = await dashboardApi.getTotalPosts();
  return res;
});

//setup state
const initialState = {
  loading: false,
  totalProviders: 0,
  totalCustomers: 0,
  totalServices: 0,
  totalPosts: 0,
};
export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //providers
    builder.addCase(getTotalProviders.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getTotalProviders.fulfilled, (state, action) => {
      state.loading = false;
      state.totalProviders = action.payload.data;
    });

    builder.addCase(getTotalProviders.rejected, (state, action) => {
      state.loading = false;
    });

    //customers
    builder.addCase(getTotalCustomers.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getTotalCustomers.fulfilled, (state, action) => {
      state.loading = false;
      state.totalCustomers = action.payload.data;
    });

    builder.addCase(getTotalCustomers.rejected, (state, action) => {
      state.loading = false;
    });

    //services
    builder.addCase(getTotalServices.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getTotalServices.fulfilled, (state, action) => {
      state.loading = false;
      state.totalServices = action.payload.data;
    });

    builder.addCase(getTotalServices.rejected, (state, action) => {
      state.loading = false;
    });

    //posts
    builder.addCase(getTotalPosts.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getTotalPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.totalPosts = action.payload.data;
    });

    builder.addCase(getTotalPosts.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

//actions
export const dashboardActions = dashboardSlice.actions;

//selectors

//reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
