import React, { useEffect, useState } from 'react';
import ChatListItems from './ChatListItems';
import { Search } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { chatActions, getListMessagesProviderCustomer, setCurrentCustomer } from '../chatSlice';
const allChatUsers = [
  {
    image:
      'https://images.unsplash.com/photo-1682685797365-6f57bbebffed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
    id: 1,
    name: 'Tim Hover',
    active: true,
    isOnline: true,
  },
  {
    image:
      'https://images.unsplash.com/photo-1682685797365-6f57bbebffed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
    id: 2,
    name: 'Ayub Rossi',
    active: false,
    isOnline: false,
  },
  {
    image:
      'https://images.unsplash.com/photo-1682685797365-6f57bbebffed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
    id: 3,
    name: 'Hamaad Dejesus',
    active: false,
    isOnline: false,
  },
  {
    image:
      'https://images.unsplash.com/photo-1682685797365-6f57bbebffed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
    id: 3,
    name: 'Hamaad Dejesus',
    active: false,
    isOnline: false,
  },
  {
    image:
      'https://images.unsplash.com/photo-1682685797365-6f57bbebffed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
    id: 3,
    name: 'Hamaad Dejesus',
    active: false,
    isOnline: false,
  },
  {
    image:
      'https://images.unsplash.com/photo-1682685797365-6f57bbebffed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
    id: 3,
    name: 'Hamaad Dejesus',
    active: false,
    isOnline: false,
  },
];
export default function ChatList(props) {
  // const [allChats, setAllChats] = useState([]);
  const { listCustomer } = props;
  const { currentCustomer, customerSendMessage, listMessagesProviderCustomer } = useSelector((state) => state.chat);
  const { currentUser } = useSelector((state) => state.auth);
  const [searchInput, setSeatchInput] = useState('');
  const dispatch = useDispatch();
  const [filteredList, setFilteredList] = new useState(listCustomer);
  useEffect(() => {
    setFilteredList(listCustomer);
  }, [listCustomer]);

  const handleChangeCurrentCustomer = async (item) => {
    dispatch(setCurrentCustomer(item));
    dispatch(chatActions.setCustomerSendMessage(''));
  };
  const handleChangeInputSearch = (e) => {
    const query = event.target.value;
    let updatedList = [...listCustomer];
    updatedList = updatedList.filter((item) => {
      return item.full_name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(updatedList);
  };
  useEffect(() => {
    const infoURL = {
      providerId: currentUser.id,
      customerId: currentCustomer.id,
    };
    dispatch(getListMessagesProviderCustomer(infoURL));
  }, [currentCustomer]);
  return (
    <div className="main__chatlist">
      <div className="chatList__search">
        <div className="search_wrap">
          <input type="text" placeholder="Tìm kiếm" required onChange={handleChangeInputSearch} />
          <button className="search-btn">
            <Search />
          </button>
        </div>
      </div>
      <div className="chatlist__items">
        {filteredList &&
          filteredList.length > 0 &&
          filteredList.map((item, index) => {
            if (customerSendMessage?.customerId === item.id) {
              return (
                <div className="list-customer-chat" onClick={() => handleChangeCurrentCustomer(item)}>
                  <ChatListItems
                    name={item.full_name}
                    key={item.id}
                    animationDelay={index + 1}
                    image={item.avatar?.url}
                    message={customerSendMessage?.message}
                  />
                  <p className="new-message"></p>
                </div>
              );
            }
            return (
              <div className="list-customer-chat" onClick={() => handleChangeCurrentCustomer(item)}>
                <ChatListItems
                  name={item.full_name}
                  key={item.id}
                  animationDelay={index + 1}
                  image={item.avatar?.url}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
