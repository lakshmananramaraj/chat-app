import React, { useState } from "react";
import { useChat } from "../context/ChatContext";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { selectedContact, sendMessage } = useChat();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim() || !selectedContact) return;

    try {
      await sendMessage(message.trim());
      setMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
        <div>
          <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
            {/* <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              ></path>
            </svg> */}
          </button>
        </div>
        <div className="flex-grow ml-4">
          <div className="relative w-full">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                selectedContact
                  ? `Message ${selectedContact.username}`
                  : "Select a contact to message"
              }
              disabled={!selectedContact}
              className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
            />
          </div>
        </div>
        <div className="ml-4">
          <button
            type="submit"
            disabled={!selectedContact || !message.trim()}
            className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
          >
            <span>Send</span>
            <span className="ml-2">
              <svg
                className="w-4 h-4 transform rotate-45 -mt-px"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
