import axiosClient from './axiosClient';

const messageApi = {
  getListCustomerChatByProvider(id) {
    const url = `/get-list-customer-chat-by-provider/${id}`;
    return axiosClient.get(url);
  },
  getListMessagesProviderCustomer(providerId, customerId) {
    const url = `/messages-by-customer-provider?provider_id=${providerId}&customer_id=${customerId}`;
    return axiosClient.get(url);
  },
  create(data) {
    const url = `/messages?sender=${data.sender}`;
    return axiosClient.post(url, data);
  },
};

export default messageApi;
