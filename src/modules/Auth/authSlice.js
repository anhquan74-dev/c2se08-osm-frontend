import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import authApi from '../../api/authApi';
import customerApi from '../../api/customerApi';
import providerApi from '../../api/providerApi';
import axiosClient from '../../api/axiosClient';
import { toast } from 'react-toastify';

export const logIn = createAsyncThunk('auths/logIn', async (request, thunkAPI) => {
  const res = await authApi.login(request);
  console.log('res login ', res);
  if (res.statusCode == 404) {
    toast.error('Email hoặc mật khẩu không chính xác');
    return;
  }
  const { access_token, refresh_token, refresh_ttl } = res.result;
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('refresh_token', refresh_token);
  let decoded = jwt_decode(access_token);
  console.log(decoded);
  thunkAPI.dispatch(getMe(decoded));
  return res;
});

export const getMe = createAsyncThunk('user/getMe', async (request) => {
  let res;
  console.log(request);
  if (request?.role === 'provider') {
    res = await providerApi.get(request?.user);
  } else if (request?.role === 'customer') {
    res = await customerApi.get(request?.user);
  } else {
    const url = `/admins/${request?.user}`;
    res = await axiosClient.get(url);
  }
  console.log('user: ', res.data[0]);
  authApi.setUser(res.data[0] || res.data);
  return authApi.getUser();
});

export const logOut = createAsyncThunk('auths/logOut', async (request, thunkAPI) => {
  const res = await authApi.logout();
  authApi.removeUser('user');
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  console.log(res);
  return res;
});

export const updateWorkingStatus = createAsyncThunk('auths/updateWorkingStatus', async (request, thunkAPI) => {
  const res = await providerApi.updateWorkingStatus(request);
  console.log(res);
  return res?.data;
});

const user = authApi.getUser();

//setup state
const initialState = user
  ? {
      isLoggedIn: true,
      currentUser: user,
      isLoading: false,
    }
  : {
      isLoggedIn: false,
      currentUser: null,
      isLoading: false,
    };
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutRedux(state) {
      state.isLoggedIn = false;
      state.currentUser = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.currentUser = null;
      toast.success('Đăng xuất thành công!');
    });
    builder.addCase(updateWorkingStatus.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = {
        ...state.currentUser,
        is_working: action.payload,
      };
      authApi.setUser({
        ...state.currentUser,
        is_working: action.payload,
      });
    });
  },
});

//actions
export const authActions = authSlice.actions;

//selectors

//reducer
const authReducer = authSlice.reducer;
export default authReducer;
