import axiosClient from './axiosClient';

const feedbackApi = {
  getAllFeedbackByPackage(id) {
    const url = `/feedbacks-by-package/${id}`;
    return axiosClient.get(url);
  },
  add(request) {
    const url = '/feedbacks';
    return axiosClient.post(url, request);
  },
  update(data) {
    const url = `/feedbacks/${data.id}`;
    return axiosClient.post(url, data);
  },

  getTotalFeedbackByProviderId(providerId) {
    const url = `/feedbacks-provider-count/${providerId}`;
    return axiosClient.get(url);
  },

  getAllFeedbackByServiceId(id) {
    const url = `/feedbacks-by-service/${id}`;
    return axiosClient.get(url);
  },
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
