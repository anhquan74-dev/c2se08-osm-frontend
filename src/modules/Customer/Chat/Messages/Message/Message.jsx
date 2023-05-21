import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';
import { useSelector } from 'react-redux';
import DefaultAvatar from '../../../../../assets/images/default-avatar.png';
const Message = (props) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { message, currentProvider } = props;
  let isSentByCurrentUser = false;
  if (message.sender == 'customer') {
    isSentByCurrentUser = true;
  } else {
    isSentByCurrentUser = false;
  }
  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(message.content)}</p>
      </div>
      <img
        className="messageAvatar"
        src={currentUser?.avatar?.url ? currentUser?.avatar?.url : DefaultAvatar}
        alt="#"
      ></img>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <img
        className="messageAvatar"
        src={currentProvider?.avatar?.url ? currentProvider?.avatar?.url : DefaultAvatar}
        alt="#"
      ></img>
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(message.content)}</p>
      </div>
    </div>
  );
};

export default Message;
