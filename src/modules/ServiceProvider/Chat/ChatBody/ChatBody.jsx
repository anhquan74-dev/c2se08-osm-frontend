import React, { useEffect } from 'react';
import './ChatBody.css';
import ChatList from '../ChatList/ChatList';
import ChatContent from '../ChatContent/ChatContent';
import { useDispatch, useSelector } from 'react-redux';
import { getListCustomerChatWithProvider, setCurrentCustomer } from '../chatSlice';

export default function ChatBody() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { listCustomerChatWithCurrentProvider, listMessagesProviderCustomer, currentCustomer } = useSelector(
    (state) => state.chat
  );

  useEffect(() => {
    dispatch(getListCustomerChatWithProvider(currentUser?.id));
  }, []);
  return (
    <div className="main__chatbody">
      <ChatList listCustomer={listCustomerChatWithCurrentProvider} />
      <ChatContent />
    </div>
  );
}
