import axiosClient from './axiosClient';

const dashboardApi = {
  getTotalProviders() {
    const url = '/provider-count';
    return axiosClient.get(url);
  },
  getTotalCustomers() {
    const url = '/customer-count';
    return axiosClient.get(url);
  },
  getTotalServices() {
    const url = '/service-count';
    return axiosClient.get(url);
  },
  getTotalPosts() {
    const url = '/post-count';
    return axiosClient.get(url);
  },
  getTotalAppointmentIn12Month() {
    const url = '/appointments-count-by-month';
    return axiosClient.get(url);
  },
};

export default dashboardApi;
