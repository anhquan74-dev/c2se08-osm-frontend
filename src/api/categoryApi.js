import axiosClient from './axiosClient';

const categoryApi = {
  getAll(request) {
    const url = '/categories';
    return axiosClient.get(url, request);
  },
  getAllPagination(request) {
    const url = '/categories/search';
    return axiosClient.post(url, request);
  },
  get(id) {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/categories';
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data', // Cần thiết lập Content-Type là multipart/form-data để server có thể hiểu được dữ liệu gửi lên
      },
    });
  },
  update(data) {
    const url = `/categories/${data.get('id')}`;
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data', // Cần thiết lập Content-Type là multipart/form-data để server có thể hiểu được dữ liệu gửi lên
      },
    });
  },
  getCategoriesForProvider(provider_id) {
    const url = `/categories-by-provider/${provider_id}`;
    return axiosClient.get(url);
  },
  getCategoriesProviderNotHave(provider_id) {
    const url = `/categories-provider-not-have/${provider_id}`;
    return axiosClient.get(url);
  },
};

export default categoryApi;
