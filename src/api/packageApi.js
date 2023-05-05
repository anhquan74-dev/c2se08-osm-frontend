import axiosClient from './axiosClient';

const packageApi = {
  getAll(request) {
    const url = '/packages/search';
    return axiosClient.post(url, request);
  },
};

export default packageApi;
