import axiosClient from './axiosClient';
import axios from 'axios';

const locationApi = {
  getPublicProvinces() {
    return axios.get('https://vapi.vnappmob.com/api/province');
  },
};

export default locationApi;
