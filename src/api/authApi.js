import axiosClient from './axiosClient';

const authApi = {
  login(user) {
    const url = '/login';
    return axiosClient.post(url, user);
  },

  logout(refreshToken) {
    const url = '/logout';
    this.removeUser('user');
    return httpRequest.post(url, { refreshToken });
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
