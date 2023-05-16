import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryApi from '../../../api/categoryApi';
import packageApi from '../../../api/packageApi';
import feedbackApi from '../../../api/feedbackApi';
import serviceApi from '../../../api/serviceApi';

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
export const getAllPackageByProviderCategory = createAsyncThunk(
  'manageService/getAllPackageByProviderCategory',
  async (request) => {
    const res = await packageApi.getAllPackageByProviderCategory(request);
    return res.data[0].package;
  }
);
export const getAllFeedbackByPackage = createAsyncThunk('manageService/getAllFeedbackByPackage', async (request) => {
  const res = await feedbackApi.getAllFeedbackByPackage(request);
  if (res.statusCode == 200) {
    return res.feedbackList;
  }
  return [];
});
export const getCurrentService = createAsyncThunk('manageService/getCurrentService', async (request) => {
  const provider_id = request.currentUserId;
  const category_id = request.service_id;
  const res = await serviceApi.getByProviderCategory(provider_id, category_id);
  return res.data[0].id;
});
//setup state
const initialState = {
  loading: false,
  serviceList: [],
  currentServiceId: null,
  currentCategoryId: null,
  serviceProviderNotHaveList: [],
  packageByProviderCategory: [],
  feedbackByPackage: [],
};
export const manageServiceSlice = createSlice({
  name: 'manageService',
  initialState,
  reducers: {
    setCurrentServiceId: (state, action) => {
      state.currentServiceId = action.payload;
    },
    setCurrentCategoryId: (state, action) => {
      state.currentCategoryId = action.payload;
    },
  },
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
    // package by provider_id category_id
    builder.addCase(getAllPackageByProviderCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllPackageByProviderCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.packageByProviderCategory = action.payload;
    });
    builder.addCase(getAllPackageByProviderCategory.rejected, (state, action) => {
      state.loading = false;
    });
    // feedback by package_id
    builder.addCase(getAllFeedbackByPackage.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllFeedbackByPackage.fulfilled, (state, action) => {
      state.loading = false;
      state.feedbackByPackage = action.payload;
    });
    builder.addCase(getAllFeedbackByPackage.rejected, (state, action) => {
      state.loading = false;
    });
    // current service_id
    builder.addCase(getCurrentService.fulfilled, (state, action) => {
      state.loading = false;
      state.currentServiceId = action.payload;
    });
  },
});

//actions
export const manageServiceActions = manageServiceSlice.actions;
export const { setCurrentServiceId } = manageServiceSlice.actions;
export const { setCurrentCategoryId } = manageServiceSlice.actions;

//selectors

//reducer
const manageServiceReducer = manageServiceSlice.reducer;
export default manageServiceReducer;
