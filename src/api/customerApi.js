import axiosClient from "./axiosClient";

const customerApi = {
  getAll(params) {
    const url = "/customers";
    return axiosClient.get(url, {
      params,
    });
  },
  get(id) {
    const url = `/customers/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = "/customers";
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/customers/${data.id}`;
    return axiosClient.put(url, data);
  },
  remove(id) {
    const url = `/customers/${id}`;
    return axiosClient.delete(url);
  },
};

export default customerApi;
