import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryApi from '../../../api/categoryApi';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '../../../utils/constants';

export const getCategories = createAsyncThunk('categories/getCategories', async (request, thunkAPI) => {
  const res = await categoryApi.getAll(request);
  return res;
});

// setup state
const initialState = {
  loading: false,
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
