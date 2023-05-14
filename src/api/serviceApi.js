import axiosClient from './axiosClient';

const serviceApi = {
  getAll() {
    const url = '/services';
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/services/${id}`;
    return axiosClient.get(url);
  },
  create(data) {
    const url = '/services';
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data', // Cần thiết lập Content-Type là multipart/form-data để server có thể hiểu được dữ liệu gửi lên
      },
    });
  },
};

export default serviceApi;
