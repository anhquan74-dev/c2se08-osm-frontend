import axiosClient from './axiosClient';

const appointmentApi = {
  getByStatus(status) {
    const url = `/appointments-customer/${status}`;
    return axiosClient.get(url);
  },
  getTotalByStatus(status) {
    const url = `/appointments-count/${status}`;
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
};

export default appointmentApi;
