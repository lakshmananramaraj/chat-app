import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.1.4:5000/api';

const authService = {
  register: async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      password
    });
    return response.data;
  },

  login: async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password
    });
    return response.data;
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No token found');
    }
    
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return response.data;
  }
};

export default authService;
