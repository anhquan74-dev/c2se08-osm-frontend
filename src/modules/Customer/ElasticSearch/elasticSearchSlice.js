import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import elasticSearchApi from '../../../api/elasticSearchApi';

export const getNews = createAsyncThunk('elastic/getNews', async (request, thunkAPI) => {
  const res = await elasticSearchApi.search(request);
  console.log(res);
  return res;
});

//setup state
const initialState = {
  loading: false,
  list: [],
  conditions: {
    from: 0,
    size: 3,
  },
};
export const elasticSearchSlice = createSlice({
  name: 'elastic',
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
      state.list = action.payload.data.hits;
    });

    builder.addCase(getNews.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

//actions
export const elasticSearchActions = elasticSearchSlice.actions;

//selectors

//reducer
const elasticSearchReducer = elasticSearchSlice.reducer;
export default elasticSearchReducer;
