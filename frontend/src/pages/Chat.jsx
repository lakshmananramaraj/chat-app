// client/src/pages/Chat.jsx
import React from 'react';
import { ChatProvider } from '../context/ChatContext';
import ChatInterface from '../components/ChatInterface';

const Chat = () => {
  return (
    <ChatProvider>
      <ChatInterface />
    </ChatProvider>
  );
};

export default Chat;