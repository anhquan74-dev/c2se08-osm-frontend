import axiosClient from './axiosClient';

const serviceApi = {
  getAll() {
    const url = '/services';
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/services/${id}`;
    return axiosClient.get(url);
  },
};

export default serviceApi;
