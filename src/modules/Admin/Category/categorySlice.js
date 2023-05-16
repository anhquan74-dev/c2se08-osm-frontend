import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryApi from '../../../api/categoryApi';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '../../../utils/constants';

export const getCategoriesPagination = createAsyncThunk(
  'categories/getCategoriesPagination',
  async (request, thunkAPI) => {
    const res = await categoryApi.getAllPagination(request);
    return res;
  }
);

export const getCategories = createAsyncThunk('categories/getCategories', async (thunkAPI) => {
  const res = await categoryApi.getAllPagination({
    page: 1,
    limit: 15,
  });
  return res?.data;
});

// setup state
const initialState = {
  loading: false,
  listPagination: [],
  list: [],
  conditions: {
    page: PAGE_DEFAULT,
    limit: LIMIT_DEFAULT,
  },
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setConditions(state, action) {
      state.conditions = action.payload;
    },
  },
  extraReducers: (builder) => {
    //set get all categories pagination
    builder.addCase(getCategoriesPagination.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getCategoriesPagination.fulfilled, (state, action) => {
      state.loading = false;
      state.listPagination = action.payload;
    });

    builder.addCase(getCategoriesPagination.rejected, (state, action) => {
      state.loading = false;
    });

    //set get all categories
    builder.addCase(getCategories.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

// actions
export const categoryActions = categorySlice.actions;

// reducer
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
