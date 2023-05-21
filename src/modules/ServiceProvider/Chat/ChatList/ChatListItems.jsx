import React, { useState } from 'react';
import Avatar from './Avatar';
import DefaultAvatar from '../../../../assets/images/default-avatar.png';
export default function ChatListItems(props) {
  const { animationDelay, active } = props;

  return (
    <div
      style={{ animationDelay: `0.${animationDelay}s` }}
      className={active == true ? 'chatlist__item active' : 'chatlist__item'}
    >
      <Avatar image={props.image ? props.image : DefaultAvatar} isOnline={props.isOnline} />

      <div className="userMeta">
        <p>{props.name}</p>
        <p style={{ fontWeight: '300' }}>Đang hoạt động</p>
      </div>
    </div>
  );
}
