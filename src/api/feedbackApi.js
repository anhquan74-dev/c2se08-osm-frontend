import axiosClient from './axiosClient';

const feedbackApi = {
  getAllFeedbackByPackage(id) {
    const url = `/feedbacks-by-package/${id}`;
    return axiosClient.get(url);
  },
  update(id, data) {
    const url = `/feedbacks/${id}`;
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data', // Cần thiết lập Content-Type là multipart/form-data để server có thể hiểu được dữ liệu gửi lên
      },
    });
  },

  // getAllPackageByProviderCategory(request) {
  //   const url = `packages-by-service-category?category_id=${request.category_id}&provider_id=${request.provider_id}`;
  //   return axiosClient.get(url);
  // },
  // getAllByServiceId(id) {
  //   const url = `/packages-by-service/${id}`;
  //   return axiosClient.get(url);
  // },
  // get(id) {
  //   const url = `/packages/${id}`;
  //   return axiosClient.get(url);
  // },
  // create(data) {
  //   const url = '/packages';
  //   return axiosClient.post(url, data, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data', // Cần thiết lập Content-Type là multipart/form-data để server có thể hiểu được dữ liệu gửi lên
  //     },
  //   });
  // },
  // delete(id) {
  //   const url = `hard-delete-package/${id}`;
  //   return axiosClient.post(url);
  // },
};

export default feedbackApi;
