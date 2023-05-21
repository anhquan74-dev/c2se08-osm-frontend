import React from 'react';
import './Chat.css';
import Nav from './Nav';
import ChatBody from './ChatBody/ChatBody';
export default function Chat() {
  return (
    <div>
      <div className="__main">
        <Nav />
        <ChatBody />
      </div>
    </div>
  );
}
