import React, { createContext, useState, useContext, useEffect } from "react";
import io from "socket.io-client";
import { useAuth } from "./AuthContext";
import messageService from "../services/messageService";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://192.168.1.4:5000";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const { currentUser, checkUserLoggedIn } = useAuth();
  const [socket, setSocket] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  // Initialize socket connection
  useEffect(() => {
    if (currentUser) {
      const newSocket = io(SOCKET_URL);
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [currentUser]);

  // Join user's room for receiving messages
  useEffect(() => {
    if (socket && currentUser) {
      socket.emit("join", currentUser.id);  
      
      socket.on("fetchContacts",()=>{
        fetchContacts()
      })

      socket.on("receiveMessage", (message) => {
        if (
          selectedContact &&
          (message.senderId === selectedContact.id ||
            message.receiverId === selectedContact.id)
        ) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      });

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [socket, currentUser, selectedContact]);


  // Fetch contacts
  useEffect(() => {
    fetchContacts();
  }, [currentUser]);
  
  const fetchContacts = async () => {
    if (currentUser) {
      try {
        setLoading(true);
        const data = await messageService.getContacts();
        setContacts(data);                     
        setError(null);
      } catch (err) {
        setError("Failed to load contacts");
      } finally {
        setLoading(false);
      }
    }
  };
  // Fetch messages when selecting a contact
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedContact) {
        try {
          setLoading(true);
          const data = await messageService.getMessages(selectedContact.id);
          setMessages(data);
          setOpen(false)
          setError(null);
        } catch (err) {
          setError("Failed to load messages");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMessages();
  }, [selectedContact]);

  const sendMessage = async (content) => {
    if (!selectedContact) return;

    try {
      const message = await messageService.sendMessage(
        selectedContact.id,
        content
      );

      // Update local messages
      setMessages((prevMessages) => [...prevMessages, message]);

      // Emit message to socket server
      if (socket) {
        socket.emit("sendMessage", message);
      }

      return message;
    } catch (err) {
      setError("Failed to send message");
      throw err;
    }
  };

  const value = {
    contacts,
    selectedContact,
    setSelectedContact,
    open,
    setOpen,
    messages,
    sendMessage,
    loading,
    error,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
