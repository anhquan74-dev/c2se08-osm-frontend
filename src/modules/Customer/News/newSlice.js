import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postApi from '../../../api/postApi';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '../../../utils/constants';

export const getNews = createAsyncThunk('news/getNews', async (request, thunkAPI) => {
  const res = await postApi.getAll(request);
  return res;
});

//setup state
const initialState = {
  loading: false,
  list: [],
  conditions: {
    page: PAGE_DEFAULT,
    limit: 6,
  },
};
export const newSlice = createSlice({
  name: 'new',
  initialState,
  reducers: {
    setConditions(state, action) {
      state.conditions = action.payload;
    },
  },
  extraReducers: (builder) => {
    //set get all new
    builder.addCase(getNews.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getNews.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(getNews.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

//actions
export const newActions = newSlice.actions;

//selectors

//reducer
const newReducer = newSlice.reducer;
export default newReducer;
