import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import authApi from '../../api/authApi';
import { getEXPToken, getTimeNow } from '../../helpers/getTokenExp';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async (loginData, { rejectWithValue }) => {
  const res = await authApi.login(loginData);
  if (res.status === 'OK') {
    const decodeAccessToken = jwt_decode(res.result.access_token);
    const EXPAccessToken = getEXPToken(res.result.access_token);
    const EXPRefreshToken = getEXPToken(res.result.refresh_token);
    const currentUser = {
      userId: decodeAccessToken.user,
      userRole: decodeAccessToken.role,
      access_token: res.result.access_token,
      access_token_exp: EXPAccessToken,
      refresh_token: res.result.refresh_token,
      refresh_token_exp: EXPRefreshToken,
    };
    return currentUser;
  }
  return rejectWithValue(res.message);
});
export const logout = createAsyncThunk('auth/logout', async (logoutData) => {
  if (logoutData.currentUser.access_token_exp > getTimeNow()) {
    const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/api/logout`, {
      headers: {
        Authorization: 'Bearer ' + logoutData.currentUser.access_token,
      },
    });
    localStorage.clear();
    logoutData.navigate('/login');
    return 'Logout success';
  } else {
    localStorage.clear();
    logoutData.navigate('/login');
    return 'Logout success';
  }
});
//setup state
const initialState = {
  loading: false,
  currentUser: null,
  errorMessage: null,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.errorMessage = null;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.errorMessage = null;
      state.currentUser = action.payload;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.currentUser = null;
      state.errorMessage = action.payload;
      toast.error(`${action.payload}`);
    });
    //logout
    builder.addCase(logout.fulfilled, (state) => {
      state.currentUser = null;
      state.errorMessage = null;
    });
  },
});

//actions
export const authActions = authSlice.actions;
export const { loginSuccess } = authSlice.actions;
//selectors

//reducer
const authReducer = authSlice.reducer;
export default authReducer;
