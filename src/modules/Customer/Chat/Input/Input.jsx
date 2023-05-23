import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './Input.css';
import messageApi from '../../../../api/messageApi';
const ENDPOINT = import.meta.env.VITE_REACT_APP_DOMAIN_NODE_SERVER;

export default function Input(props) {
  const { providerId, customerId, setMessages } = props;
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io(ENDPOINT));
  }, []);
  const [message, setMessage] = useState('');
  const sendMessage = async (event) => {
    event.preventDefault();
    if (message) {
      const dataSend = {
        provider_id: providerId,
        customer_id: customerId,
        sender: 'customer',
        content: message,
      };
      const res = await messageApi.create(dataSend);
      if (res.statusCode == 201) {
        const resMessages = await messageApi.getListMessagesProviderCustomer(providerId, customerId);
        setMessages(resMessages.data);
        setMessage('');
      }
      socket?.emit('customer_send_message', { customerId, message });
    }
  };
  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Nhập tin nhắn mới ..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
      />
      <button className="sendButton" onClick={(e) => sendMessage(e)}>
        Gửi
      </button>
    </form>
  );
}
