import axios from 'axios';
import { toast } from 'react-toastify';
import { authActions } from '../modules/Auth/authSlice';
import authApi from './authApi';
import axiosClient from './axiosClient';

const setup = (store) => {
  axiosClient.interceptors.request.use(
    function (config) {
      const token = authApi.getLocalAccessToken();
      if (token) {
        config.headers = { ...axiosClient.headers, Authorization: `Bearer ${token}` };
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;
  axiosClient.interceptors.response.use(
    function (response) {
      return response.data;
    },
    async function (error) {
      const originalConfig = error.config;

      if (originalConfig.url !== '/login' && error.response) {
        if (error.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('refresh_token')}`;
            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/refresh`);

            const { access_token } = res.data.result;
            authApi.updateLocalAccessToken(access_token);

            return axiosClient(originalConfig);
          } catch (_error) {
            toast.error('Session time out. Please login again.', {
              id: 'sessionTimeOut',
            });

            // Logging out the user by removing all the tokens from local
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            authApi.removeUser();
            dispatch(authActions.logoutRedux());

            // Redirecting the user to the landing page
            window.location.href = window.location.origin + '/login';
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(error);
    }
  );
};

export default setup;
