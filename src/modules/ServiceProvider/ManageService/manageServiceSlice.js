import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import providerApi from '../../../api/providerApi';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '../../../utils/constants';
import categoryApi from '../../../api/categoryApi';

export const getCategoriesForProvider = createAsyncThunk('manageService/getCategoriesForProvider', async (request) => {
  const res = await categoryApi.getCategoriesForProvider(request);
  return res.data;
});
export const getCategoriesProviderNotHave = createAsyncThunk(
  'manageService/getCategoriesProviderNotHave',
  async (request) => {
    const res = await categoryApi.getCategoriesProviderNotHave(request);
    const options = res.data.map((item) => {
      return {
        value: item[0].id,
        label: item[0].name,
      };
    });
    return options;
  }
);

//setup state
const initialState = {
  loading: false,
  serviceList: [],
  serviceProviderNotHaveList: [],
};
export const manageServiceSlice = createSlice({
  name: 'manageService',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get categories for service screen
    builder.addCase(getCategoriesForProvider.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getCategoriesForProvider.fulfilled, (state, action) => {
      state.loading = false;
      state.serviceList = action.payload;
    });

    builder.addCase(getCategoriesForProvider.rejected, (state, action) => {
      state.loading = false;
    });
    // get categories provider doesn't have
    builder.addCase(getCategoriesProviderNotHave.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getCategoriesProviderNotHave.fulfilled, (state, action) => {
      state.loading = false;
      state.serviceProviderNotHaveList = action.payload;
    });

    builder.addCase(getCategoriesProviderNotHave.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

//actions
export const manageServiceActions = manageServiceSlice.actions;

//selectors

//reducer
const manageServiceReducer = manageServiceSlice.reducer;
export default manageServiceReducer;
