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
  getByProviderCategory(provider_id, category_id) {
    const url = `/service-by-provider-category?provider_id=${provider_id}&category_id=${category_id}`;
    return axiosClient.get(url);
  },
  create(data) {
    const url = '/services';
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data', // Cần thiết lập Content-Type là multipart/form-data để server có thể hiểu được dữ liệu gửi lên
      },
    });
  },
  deleteByCategoryId(id) {
    const url = `/hard-delete-service-by-category-id/${id}`;
    return axiosClient.post(url);
  },
};

export default serviceApi;
