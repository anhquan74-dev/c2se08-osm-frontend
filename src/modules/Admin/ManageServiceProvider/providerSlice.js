import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import providerApi from '../../../api/providerApi';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '../../../utils/constants';

export const getProviders = createAsyncThunk('providers/getProviders', async (request, thunkAPI) => {
  const res = await providerApi.getAll(request);
  return res;
});

// export const getProviderId = createAsyncThunk('providers/getProviderId', async (providerId, { dispatch }) => {

// });

// export const postAddProvider = createAsyncThunk('providers/postAddProvider', async (provider, { dispatch }) => {

// });

// export const postUpdateProvider = createAsyncThunk('providers/postUpdateProvider', async (provider, { dispatch }) => {

// });

export const postDeleteProvider = createAsyncThunk('providers/postDeleteProvider', async (provider, { dispatch }) => {
  const res = await providerApi.update(provider);
  dispatch(getProviders({ page: PAGE_DEFAULT, limit: LIMIT_DEFAULT }));
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
export const providerSlice = createSlice({
  name: 'provider',
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
      state.list = action.payload;
    });

    builder.addCase(getProviders.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

//actions
export const providerActions = providerSlice.actions;

//selectors

//reducer
const providerReducer = providerSlice.reducer;
export default providerReducer;
