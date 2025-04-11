import React, { useState } from "react";
import ContactsList from "./ContactsList";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import Drawer from "./Drawer";
import { useChat } from "../context/ChatContext";
import Avatar from "react-avatar";

const ChatInterface = () => {
  const { open, setOpen, selectedContact } = useChat();
  return (
    <div className="flex flex-col h-screen antialiased text-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 block xl:hidden">
        <div className="flex items-center">
          <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              ></path>
            </svg>
          </div>
          <div className="ml-2 font-bold text-2xl">Chat App</div>
        </div>
        <div className="flex items-center">
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={() => setOpen(true)}
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <Drawer open={open} side="left" setOpen={setOpen} />

      {/* Main content */}
      <div className="flex flex-1 h-[80vh] xl:h-screen xl:overflow-hidden">
        {/* Contacts sidebar */}
        <div className="w-64 bg-white hidden xl:block">
          <ContactsList setOpen={setOpen} />
        </div>

        {/* Chat area */}
        <div className="flex flex-col flex-1 p-6">
          <div className="flex flex-col flex-auto gap-2 flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            {/* Chat header */}
            {selectedContact && (
              <div className="flex items-center p-4 md:px-6 py-4 bg-white border-b border-gray-200 rounded-xl">
                <div className="flex items-center gap-2 md:gap-2">
                  <Avatar
                    name={selectedContact.username}
                    size="30"
                    className="rounded-full"
                  />
                  <h2 className="text-lg font-semibold text-gray-800 capitalize">
                    {selectedContact.username}
                  </h2>
                </div>
              </div>
            )}
            {/* Messages */}
            <div className="flex-1 overflow-hidden">
              <MessageList />
            </div>

            {/* Message input */}
            {selectedContact && <MessageInput />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
