import React, { createRef, useEffect, useRef, useState } from 'react';
import './ChatContent.css';
import ChatItem from './ChatItem';
import Avatar from '../ChatList/Avatar';
// import { AddCircleOutlineIcon } from '@mui/icons-material';
import { AddAPhoto } from '@mui/icons-material';
import { useSelector } from 'react-redux';
// import DefaultAvatar from '../../../assets/images/default-avatar.png';
import DefaultAvatar from '../../../../assets/images/default-avatar.png';
import messageApi from '../../../../api/messageApi.js';
import { useDispatch } from 'react-redux';
import { getListMessagesProviderCustomer } from '../chatSlice';

const chatItms = [
  {
    key: 1,
    image:
      'https://plus.unsplash.com/premium_photo-1667760701840-6d2e8ab46af0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
    type: '',
    msg: 'Hi Tim, How are you?',
  },
  {
    key: 2,
    image:
      'https://plus.unsplash.com/premium_photo-1667760701840-6d2e8ab46af0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
    type: 'other',
    msg: 'I am fine.',
  },
  {
    key: 3,
    image:
      'https://plus.unsplash.com/premium_photo-1667760701840-6d2e8ab46af0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
    type: 'other',
    msg: 'What about you?',
  },
  {
    key: 4,
    image:
      'https://plus.unsplash.com/premium_photo-1667760701840-6d2e8ab46af0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
    type: 'other',
    msg: 'What about you?',
  },
  {
    key: 4,
    image:
      'https://plus.unsplash.com/premium_photo-1667760701840-6d2e8ab46af0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
    type: 'other',
    msg: 'What about you?',
  },
  {
    key: 5,
    image:
      'https://plus.unsplash.com/premium_photo-1667760701840-6d2e8ab46af0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
    type: 'other',
    msg: 'What about you?',
  },
];

export default function ChatContent(props) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { listMessagesProviderCustomer } = props;
  const { currentCustomer } = useSelector((state) => state.chat);
  const providerAvatarURL = currentUser?.avatar.url;
  const [chat, setChat] = useState(null);
  const [msg, setMsg] = useState('');

  const messagesEndRef = useRef(null);
  // const messagesEndRef1 = React.createRef();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    setMsg('');
    scrollToBottom();
  }, [listMessagesProviderCustomer]);
  const onStateChange = (e) => {
    setMsg(e.target.value);
  };
  const handleSubmitMessage = async () => {
    const dataSend = {
      provider_id: currentUser.id,
      customer_id: currentCustomer.id,
      sender: 'provider',
      content: msg,
    };
    const res = await messageApi.create(dataSend);
    console.log('🚀 ~ file: ChatContent.jsx:99 ~ handleSubmitMessage ~ res:', res);
    setMsg('');
    dispatch(getListMessagesProviderCustomer({ providerId: currentUser.id, customerId: currentCustomer.id }));
    scrollToBottom();
  };
  return (
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
          <input type="text" placeholder="Nhập tin nhẵn mới ..." onChange={onStateChange} value={msg} />
          <button className="btnSendMsg" id="sendMsgBtn" onClick={handleSubmitMessage}>
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}

// how to scroll screen to top in reactJS ?
