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
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data', // Cần thiết lập Content-Type là multipart/form-data để server có thể hiểu được dữ liệu gửi lên
      },
    });
  },
  update(data) {
    const url = `/customers/${data.get('id')}`;
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data', // Cần thiết lập Content-Type là multipart/form-data để server có thể hiểu được dữ liệu gửi lên
      },
    });
  },
  remove(id) {
    const url = `/hard-delete-customer/${id}`;
    return axiosClient.post(url);
  },
};

export default customerApi;
