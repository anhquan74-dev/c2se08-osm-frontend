import React from 'react';
import './ChatList.scss';
import DefaultAvatar from '../../../../assets/images/default-avatar.png';
export default function Avatar(props) {
  const { image } = props;
  return (
    <div className="avatar-chat-list">
      <div className="avatar-img">
        <img src={image ? image : DefaultAvatar} alt="#" />
      </div>
      {/* <span className={`isOnline ${isOnline}`}></span> */}
    </div>
  );
}
