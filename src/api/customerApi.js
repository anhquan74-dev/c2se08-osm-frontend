import axiosClient from './axiosClient';

const customerApi = {
  getAll(request) {
    const url = '/customers/search';
    return axiosClient.post(url, request);
  },
  get(id) {
    const url = `/customers/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/customers';
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/customers/${data.id}`;
    return axiosClient.post(url, data);
  },
  // remove(id) {
  //   const url = `/hard-delete-customer/${id}`;
  //   return axiosClient.delete(url);
  // },
};

export default customerApi;
