import axiosClient from './axiosClient';

const appointmentApi = {
  getByStatus(status) {
    const url = `/appointments-customer/${status}`;
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
};

export default appointmentApi;
