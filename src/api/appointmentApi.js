import axiosClient from './axiosClient';

const appointmentApi = {
  getByStatus(status) {
    const url = `/appointments-customer/${status}`;
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
