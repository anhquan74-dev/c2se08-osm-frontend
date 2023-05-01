import axiosClient from './axiosClient';
import axios from 'axios';

const locationApi = {
  getPublicProvinces() {
    return axios.get('https://vapi.vnappmob.com/api/province');
  },
  getLocationByUserId(id) {
    const url = `/locations-by-user/${id}`;
    return axiosClient.get(url);
  },
  createLocation(data) {
    const url = '/api/locations';
    return axiosClient.post(url, data);
  },
  updateLocation(data) {
    const url = `/locations/${data.id}`;
    return axiosClient.post(url, data);
  },
};

export default locationApi;
