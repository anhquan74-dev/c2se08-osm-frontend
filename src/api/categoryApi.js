import axiosClient from './axiosClient';

const categoryApi = {
  getAll(request) {
    const url = '/categories/search';
    return axiosClient.post(url, request);
  },
  get(id) {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/categories';
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/categories/${data.id}`;
    return axiosClient.post(url, data);
  },
};

export default categoryApi;
