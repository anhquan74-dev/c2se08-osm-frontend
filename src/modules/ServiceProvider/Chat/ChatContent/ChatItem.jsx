import React from 'react';
import Avatar from '../ChatList/Avatar';
import moment from 'moment';
export default function ChatItem(props) {
  return (
    <div style={{ animationDelay: `0.8s` }} className={`chat__item ${props.user == 'customer' ? 'other' : ''}`}>
      <div className="chat__item__content">
        <div className="chat__msg">{props.msg}</div>
        <div className="chat__meta">
          <span></span>
          <span>{moment(props.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
        </div>
      </div>
      <Avatar isOnline="active" image={props.image} />
    </div>
  );
}
