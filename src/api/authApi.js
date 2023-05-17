import axiosClient from './axiosClient';

const authApi = {
  register(data) {
    const url = '/register';
    return axiosClient.post(url, data);
  },
  login(user) {
    const url = '/login';
    return axiosClient.post(url, user);
  },

  logout() {
    const url = '/logout';
    return axiosClient.post(url);
  },

  getLocalRefreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    return refreshToken;
  },

  getLocalAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    return accessToken;
  },

  updateLocalAccessToken(token) {
    localStorage.setItem('access_token', token);
  },

  updateLocalRefreshToken(token) {
    localStorage.setItem('refresh_token', token);
  },

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  },

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  removeUser() {
    localStorage.removeItem('user');
  },
};

export default authApi;
