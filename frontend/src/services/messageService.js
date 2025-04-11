import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.1.4:5000/api';

// Request interceptor to add auth token
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

const messageService = {
  getContacts: async () => {
    const response = await axios.get(`${API_URL}/auth/users`);
    return response.data;
  },

  getMessages: async (userId) => {
    const response = await axios.get(`${API_URL}/messages/${userId}`);
    return response.data;
  },

  sendMessage: async (receiverId, content) => {
    const response = await axios.post(`${API_URL}/messages`, {
      receiverId,
      content
    });
    return response.data;
  }
};

export default messageService;