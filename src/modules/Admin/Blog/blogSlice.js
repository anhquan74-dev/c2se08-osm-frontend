import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postApi from '../../../api/postApi';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '../../../utils/constants';

export const getBlogs = createAsyncThunk('blogs/getBlogs', async (request, thunkAPI) => {
  const res = await postApi.getAll(request);
  return res;
});

export const postDeleteBlog = createAsyncThunk('blogs/postDeleteBlog', async (blog, { dispatch }) => {
  const res = await postApi.update(blog);
  dispatch(getBlogs({ page: PAGE_DEFAULT, limit: LIMIT_DEFAULT }));
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
export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setConditions(state, action) {
      state.conditions = action.payload;
    },
  },
  extraReducers: (builder) => {
    //set get all blog
    builder.addCase(getBlogs.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getBlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(getBlogs.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

//actions
export const blogActions = blogSlice.actions;

//selectors

//reducer
const blogReducer = blogSlice.reducer;
export default blogReducer;
