import React, { useState, useEffect } from 'react';

import { io } from 'socket.io-client';
import './Chat.css';
import InfoBar from './InfoBar/InfoBar';
import Messages from './Messages/Messages';
import Input from './Input/Input';
import { useSelector } from 'react-redux';
import messageApi from '../../../api/messageApi';

const ENDPOINT = import.meta.env.VITE_REACT_APP_DOMAIN_NODE_SERVER;

// let socket;

const Chat = (props) => {
  const { openChat, handleCloseChat, currentProvider } = props;
  // const currentProvider = useSelector((state) => state.providerCustomer.provider);
  console.log(currentProvider);
  const [socket, setSocket] = useState(null);

  // const [isShow, setIsShow] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setSocket(io(ENDPOINT));
  }, []);
  const getMessages = async () => {
    const res = await messageApi.getListMessagesProviderCustomer(currentProvider?.id, currentUser?.id);
    setMessages(res.data);
  };
  useEffect(() => {
    getMessages();
  }, [openChat]);
  useEffect(() => {
    socket?.on('customer_refresh_messages', () => {
      getMessages();
    });
  }, [socket]);
  return (
    <div className="container-chat">
      <InfoBar providerInfo={currentProvider} handleCloseChat={handleCloseChat} />
      <Messages messages={messages} currentProvider={currentProvider} />
      <Input setMessages={setMessages} providerId={currentProvider?.id} customerId={currentUser?.id} />
    </div>
  );
};

export default Chat;
