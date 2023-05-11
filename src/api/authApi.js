import axiosClient from './axiosClient';

const authApi = {
  login(data) {
    const url = '/login';
    return axiosClient.post(url, data);
  },

  register(data) {
    const url = '/register';
    return axiosClient.post(url, data);
  },
};

export default authApi;
