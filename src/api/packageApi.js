import axiosClient from './axiosClient';

const packageApi = {
  getAll(request) {
    const url = '/packages/search';
    return axiosClient.post(url, request);
  },
  getAllPackageByProviderCategory(request) {
    const url = `packages-by-service-category?category_id=${request.category_id}&provider_id=${request.provider_id}`;
    return axiosClient.get(url);
  },
  getAllByServiceId(id) {
    const url = `/packages-by-service/${id}`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/packages/${id}`;
    return axiosClient.post(url);
  },
};

export default packageApi;
