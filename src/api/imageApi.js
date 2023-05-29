import axiosClient from './axiosClient';

const imageApi = {
  get(id) {
    const url = `/images/${id}/get`;
    return axiosClient.post(url);
  },
};

export default imageApi;
