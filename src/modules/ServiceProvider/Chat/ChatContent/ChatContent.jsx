import React, { useEffect, useRef, useState } from 'react';
import Avatar from '../ChatList/Avatar';
import './ChatContent.css';
import ChatItem from './ChatItem';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import messageApi from '../../../../api/messageApi.js';
import { chatActions, getListCustomerChatWithProvider, getListMessagesProviderCustomer } from '../chatSlice';
import { io } from 'socket.io-client';
const ENDPOINT = import.meta.env.VITE_REACT_APP_DOMAIN_NODE_SERVER;

export default function ChatContent(props) {
  const { currentCustomer } = useSelector((state) => state.chat);
  // console.log(currentCustomer.id);
  const { listMessagesProviderCustomer } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  const { currentUser } = useSelector((state) => state.auth);
  const [msg, setMsg] = useState('');
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setSocket(io(ENDPOINT));
  }, []);
  // useEffect(() => {
  //   dispatch(getListCustomerChatWithProvider(currentUser.id));
  // }, []);

  useEffect(() => {
    setMsg('');
    scrollToBottom();
  }, [listMessagesProviderCustomer]);
  const onStateChange = (e) => {
    setMsg(e.target.value);
  };
  const handleSubmitMessage = async () => {
    if (msg) {
      const dataSend = {
        provider_id: currentUser.id,
        customer_id: currentCustomer.id,
        sender: 'provider',
        content: msg,
      };
      const res = await messageApi.create(dataSend);
      setMsg('');
      dispatch(getListMessagesProviderCustomer({ providerId: currentUser.id, customerId: currentCustomer.id }));
      scrollToBottom();
      console.log('gửi');
      socket?.emit('provider_send_message');
    } else {
      return;
    }
  };
  useEffect(() => {
    console.log('ok');
    socket?.on('provider_refresh_messages', ({ customerId, message }) => {
      console.log('provider_refresh_messages');
      dispatch(chatActions.setCustomerSendMessage({ customerId, message }));
      dispatch(getListMessagesProviderCustomer({ providerId: currentUser.id, customerId }));
    });
  }, [socket]);
  return (
    <>
      {currentCustomer ? (
        <div className="main__chatcontent">
          <div className="content__header">
            <div className="blocks">
              <div className="current-chatting-user">
                <Avatar isOnline="active" image={currentCustomer.avatar?.url} />
                <p>{currentCustomer.full_name}</p>
              </div>
            </div>
          </div>
          <div className="content__body">
            <div className="chat__items">
              {listMessagesProviderCustomer &&
                listMessagesProviderCustomer.length > 0 &&
                listMessagesProviderCustomer.map((item, index) => {
                  let image = '';
                  if (item.sender == 'provider') {
                    image = currentUser.avatar?.url;
                  } else {
                    image = currentCustomer.avatar?.url;
                  }
                  return (
                    <ChatItem
                      animationDelay={index + 2}
                      key={item.id}
                      user={item.sender}
                      msg={item.content}
                      image={image}
                      createdAt={item.created_at}
                    />
                  );
                })}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="content__footer">
            <div className="sendNewMessage">
              <input
                type="text"
                placeholder="Nhập tin nhẵn mới ..."
                onChange={onStateChange}
                value={msg}
                onKeyPress={(event) => (event.key === 'Enter' ? handleSubmitMessage() : null)}
              />
              <button className="btnSendMsg" id="sendMsgBtn" onClick={handleSubmitMessage}>
                Gửi
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-chat-choose">
          <strong>Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới</strong>
        </div>
      )}
    </>
  );
}
