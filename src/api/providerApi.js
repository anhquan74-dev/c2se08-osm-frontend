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
  // add(data) {
  //   const url = '/providers';
  //   return axiosClient.post(url, data);
  // },
  // update(data) {
  //   const url = `/providers/${data.id}`;
  //   return axiosClient.post(url, data);
  // },
  add(data) {
    const url = '/providers';
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data', // Cần thiết lập Content-Type là multipart/form-data để server có thể hiểu được dữ liệu gửi lên
      },
    });
  },
  update(data) {
    const url = `/providers/${data.get('id')}`;
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data', // Cần thiết lập Content-Type là multipart/form-data để server có thể hiểu được dữ liệu gửi lên
      },
    });
  },
  updateWorkingStatus(id) {
    const url = `/provider-working-status/${id}`;
    return axiosClient.post(url);
  },
  remove(id) {
    const url = `/hard-delete-provider/${id}`;
    return axiosClient.post(url);
  },
};

export default providerApi;
