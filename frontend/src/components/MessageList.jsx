import React, { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { format } from 'date-fns';
import Avatar from 'react-avatar';

const MessageList = () => {
  const { currentUser } = useAuth();
  const { selectedContact, messages, loading } = useChat();
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {

      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      // messagesEndRef.current.scrollBottom = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  if (!selectedContact) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <p>Select a contact to start messaging</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-gray-500">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-grow text-gray-500">
          <p>No messages yet. Start a conversation!</p>
        </div>
      ) : (
        <div>
          {messages.map((message) => {
            const isCurrentUser = message.senderId === currentUser.id;
            
            return (
              <div
                key={message.id}
                className={`relative group flex gap-2 mb-6 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
               {!isCurrentUser && <Avatar className='rounded-full' size="40" name={message.sender.username} />}
                <div
                  className={`max-w-xs px-4 py-2 rounded-xl shadow ${
                    isCurrentUser
                      ? 'bg-indigo-100 text-gray-800'
                      : 'bg-white text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>                
                </div>
                {isCurrentUser && <Avatar className='rounded-full' size="40" name={message.sender.username} />}
                <div className={`absolute hidden group-hover:block text-xs bottom-0 ${isCurrentUser ? "right-0" : "left-0"} -mb-5 mr-2 text-gray-500`}>
                {/* {formatDistanceToNow(new Date(message.created_at))} */}
                {format(new Date(message.created_at), 'dd/MM/yyyy hh:mm a')}
                 </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default MessageList;