import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import messageApi from '../../../api/messageApi';

export const getListCustomerChatWithProvider = createAsyncThunk(
  'chat/getListCustomerChatWithProvider',
  async (provider_id) => {
    const resListCustomer = await messageApi.getListCustomerChatByProvider(provider_id);
    // const resMessagesWithFirstCustomer = await messageApi.getListMessagesProviderCustomer(
    //   provider_id,
    //   resListCustomer.data[0].id
    // );
    // const data = {
    //   resListCustomer: resListCustomer.data,
    //   resMessagesWithFirstCustomer: resMessagesWithFirstCustomer.data,
    // };
    return resListCustomer.data;
  }
);
export const getListMessagesProviderCustomer = createAsyncThunk(
  'chat/getListMessagesProviderCustomer',
  async (data) => {
    const res = await messageApi.getListMessagesProviderCustomer(data.providerId, data.customerId);
    return res.data;
  }
);
//setup state
const initialState = {
  loading: false,
  listCustomerChatWithCurrentProvider: [],
  listMessagesProviderCustomer: [],
  currentCustomer: '',
  customerSendMessage: '',
};
export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentCustomer: (state, action) => {
      state.currentCustomer = action.payload;
    },
    setCustomerSendMessage: (state, action) => {
      state.customerSendMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListCustomerChatWithProvider.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getListCustomerChatWithProvider.fulfilled, (state, action) => {
      state.loading = false;
      state.listCustomerChatWithCurrentProvider = action.payload;
      // state.listMessagesProviderCustomer = action.payload.resMessagesWithFirstCustomer;
      // state.currentCustomer = action.payload.resListCustomer[0];
    });

    builder.addCase(getListCustomerChatWithProvider.rejected, (state, action) => {
      state.loading = false;
    });

    //
    builder.addCase(getListMessagesProviderCustomer.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getListMessagesProviderCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.listMessagesProviderCustomer = action.payload;
    });

    builder.addCase(getListMessagesProviderCustomer.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

//actions
export const chatActions = chatSlice.actions;
export const { setCurrentCustomer } = chatSlice.actions;

//selectors

//reducer
const chatReducer = chatSlice.reducer;
export default chatReducer;
