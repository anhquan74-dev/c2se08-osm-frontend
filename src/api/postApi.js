import axiosClient from './axiosClient';

const postApi = {
  getAll(request) {
    const url = '/posts/search';
    return axiosClient.post(url, request);
  },
  get(id) {
    const url = `/posts/${id}`;
    return axiosClient.get(url);
  },
  getByCategory(categoryId) {
    const url = `/posts-by-category/${categoryId}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/posts';
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data', // Cần thiết lập Content-Type là multipart/form-data để server có thể hiểu được dữ liệu gửi lên
      },
    });
  },
  update(data) {
    const url = `/posts/${data.get('id')}`;
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data', // Cần thiết lập Content-Type là multipart/form-data để server có thể hiểu được dữ liệu gửi lên
      },
    });
  },
  // remove(id) {
  //   const url = `/hard-delete-post/${id}`;
  //   return axiosClient.delete(url);
  // },
};

export default postApi;
