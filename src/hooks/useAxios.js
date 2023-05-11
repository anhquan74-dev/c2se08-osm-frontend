import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, logout } from '../modules/Auth/authSlice';
import { getEXPToken, getTimeNow } from '../helpers/getTokenExp';
const baseURL = import.meta.env.VITE_REACT_APP_API_ENDPOINT;
const useAxios = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth?.currentUser);
  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${currentUser?.access_token}` },
  });
  console.log('getTimeNow():', getTimeNow());
  axiosInstance.interceptors.request.use(
    async (req) => {
      if (currentUser.access_token_exp <= getTimeNow()) {
        if (currentUser.refresh_token_exp > getTimeNow()) {
          axios.defaults.headers.common = { Authorization: `bearer ${currentUser?.refresh_token}` };
          const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/refresh`);
          console.log('refresh response:', response.data.result);
          console.log('time new access', getEXPToken(response.data.result.access_token));
          console.log('time new refresh', getEXPToken(response.data.result.refresh_token));
          const refreshUser = {
            ...currentUser,
            access_token: response.data.result.access_token,
            access_token_exp: getEXPToken(response.data.result.access_token),
            refresh_token: response.data.result.refresh_token,
            refresh_token_exp: getEXPToken(response.data.result.refresh_token),
          };
          dispatch(loginSuccess(refreshUser));
          req.headers.Authorization = `Bearer ${response.data.result.access_token}`;
          return req;
        } else {
          dispatch(logout({ currentUser, navigate }));
          return req;
        }
      } else {
        return req;
      }
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return axiosInstance;
};
export default useAxios;
