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

const currentProvider = {
  id: 5,
  full_name: 'Anh Quân',
  avatar: {
    url: 'https://images.unsplash.com/photo-1683924071058-727d83504671?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
  },
};
const Chat = () => {
  const [socket, setSocket] = useState(null);

  const [isShow, setIsShow] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setSocket(io(ENDPOINT));
  }, []);
  const getMessages = async () => {
    const res = await messageApi.getListMessagesProviderCustomer(currentProvider.id, currentUser.id);
    setMessages(res.data);
  };
  useEffect(() => {
    getMessages();
  }, [isShow]);
  useEffect(() => {
    socket?.on('customer_refresh_messages', () => {
      getMessages();
    });
  }, [socket]);
  return (
    <div className="fixed-outerContainer">
      <div className="outerContainer">
        <div className="container-chat">
          <InfoBar providerInfo={currentProvider} setIsShow={setIsShow} />
          <Messages messages={messages} currentProvider={currentProvider} />
          <Input setMessages={setMessages} providerId={currentProvider.id} customerId={currentUser.id} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
