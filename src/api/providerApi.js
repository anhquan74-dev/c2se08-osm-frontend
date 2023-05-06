import axiosClient from './axiosClient';

const providerApi = {
  getAll(request) {
    const url = '/providers/search';
    return axiosClient.post(url, request);
  },
  get(id) {
    const url = `/providers/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/providers';
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/providers/${data.id}`;
    return axiosClient.post(url, data);
  },
  // remove(id) {
  //   const url = `/hard-delete-provider/${id}`;
  //   return axiosClient.delete(url);
  // },
};

export default providerApi;
