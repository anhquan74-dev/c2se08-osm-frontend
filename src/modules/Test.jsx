import React from 'react';
import ChatContent from './ServiceProvider/Chat/ChatContent/ChatContent';
import { useSelector } from 'react-redux';
import Chat from './Customer/Chat/Chat';

export default function Test() {
  return (
    <div>
      <Chat />
    </div>
  );
}
