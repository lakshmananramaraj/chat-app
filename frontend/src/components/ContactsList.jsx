import React from "react";
import { useChat } from "../context/ChatContext";
import { formatDistanceToNow } from "date-fns";
import Avatar from "react-avatar";
import { useAuth } from "../context/AuthContext";

const ContactsList = () => {
  const { contacts, selectedContact, setSelectedContact, loading } = useChat();
  const { currentUser, logout } = useAuth();
  const innerWidth = window.innerWidth;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading contacts...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between h-full py-8 pl-6 pr-2 bg-white flex-shrink-0">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-center h-12 w-full">
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
        <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
          <Avatar
            name={currentUser.username}
            size={innerWidth <= 1268 ? "40" : "90"}
            className="rounded-full"
          />
          <div className="text-sm font-semibold mt-2 capitalize">
            {currentUser.username}
          </div>
          <div className="flex flex-row items-center mt-3">
            {/* {currentUser.active ? ( */}
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            {/* ) : (
            <div className="h-2 w-2 bg-red-500 rounded-full"></div>
          )} */}
            <div className="leading-none ml-1 text-xs">
              {currentUser.active ? "Active" : "Active"}
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="flex flex-row items-center justify-between text-xs">
            <span className="font-bold">Chat</span>
          </div>
          <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
            {contacts.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <div className="text-gray-500">No user found</div>
              </div>
            )}
            {contacts.map((contact) => (
              <button
                key={contact.id}
                className={`flex flex-row items-center justify-between cursor-pointer hover:bg-gray-100 rounded-xl p-2 ${
                  selectedContact?.id === contact.id ? "bg-gray-100" : ""
                }`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex items-center">
                  <Avatar
                    name={contact.username}
                    size="30"
                    className="rounded-full"
                  />
                  <div className="ml-2 text-sm font-semibold capitalize">
                    {contact.username}
                  </div>
                </div>
                {contact.active ? (
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
                ) : (
                  <div className="h-2 w-2 bg-red-500 rounded-full mr-3"></div>
                )}
              </button>
            ))}
          </div>
          {/* <div className="flex flex-row items-center justify-between text-xs mt-6">
              <span className="font-bold">Archivied</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                7
              </span>
            </div>
            <div className="flex flex-col space-y-1 mt-4 -mx-2">
              <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                  H
                </div>
                <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
              </button>
            </div> */}
        </div>
      </div>
      <div>
        <button
          onClick={logout}
          className="px-3 py-1 text-sm flex gap-2 rounded hover:bg-red-600 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            id="Capa_1"
            className="w-5 h-5 fill-current"
            viewBox="0 0 56 56"
          >
            <g>
              <path d="M54.424,28.382c0.101-0.244,0.101-0.519,0-0.764c-0.051-0.123-0.125-0.234-0.217-0.327L42.208,15.293   c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L51.087,27H20.501c-0.552,0-1,0.447-1,1s0.448,1,1,1h30.586L40.794,39.293   c-0.391,0.391-0.391,1.023,0,1.414C40.989,40.902,41.245,41,41.501,41s0.512-0.098,0.707-0.293l11.999-11.999   C54.299,28.616,54.373,28.505,54.424,28.382z" />
              <path d="M36.501,33c-0.552,0-1,0.447-1,1v20h-32V2h32v20c0,0.553,0.448,1,1,1s1-0.447,1-1V1c0-0.553-0.448-1-1-1h-34   c-0.552,0-1,0.447-1,1v54c0,0.553,0.448,1,1,1h34c0.552,0,1-0.447,1-1V34C37.501,33.447,37.053,33,36.501,33z" />
            </g>
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ContactsList;
