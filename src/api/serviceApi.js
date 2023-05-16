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
  getByProvider(providerId) {
    const url = `/services-by-provider/${providerId}`;
    return axiosClient.get(url);
  },
  getByProviderCategory(provider_id, category_id) {
    const url = `/service-by-provider-category?provider_id=${provider_id}&category_id=${category_id}`;
    return axiosClient.get(url);
  },
  create(data) {
    const url = '/services';
    return axiosClient.post(url, data);
  },
  deleteByCategoryId(id) {
    const url = `/hard-delete-service-by-category-id/${id}`;
    return axiosClient.post(url);
  },
  delete(serviceId) {
    const url = `/hard-delete-service/${serviceId}`;
    return axiosClient.post(url);
  },
};

export default serviceApi;
