import axiosClient from './axiosClient';

const appointmentApi = {
  getByStatusCustomer(status, userId) {
    console.log(userId);
    const url = `/appointments-customer?status=${status}&userId=${userId}`;
    return axiosClient.get(url);
  },
  getByStatusProvider(status, userId) {
    console.log(userId);
    const url = `/appointments-provider?status=${status}&userId=${userId}`;
    return axiosClient.get(url);
  },
  getTotalByUser(userId) {
    const url = `/appointments-count/${userId}`;
    return axiosClient.get(url);
  },
  add(request) {
    const url = '/appointments';
    return axiosClient.post(url, request, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  update(request) {
    const url = `/appointments/${request.id}`;
    return axiosClient.post(url, request);
  },
  delete(id) {
    const url = `/hard-delete-appointment/${id}`;
    return axiosClient.post(url);
  },
};

export default appointmentApi;
