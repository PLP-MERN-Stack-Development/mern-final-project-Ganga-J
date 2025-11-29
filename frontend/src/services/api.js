import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
  getProfile: () => api.get('/api/auth/profile'),
  updateProfile: (updates) => api.put('/api/auth/profile', updates),
  logout: () => api.post('/api/auth/logout'),
};

// Pledges API
export const pledgesAPI = {
  getAll: (params) => api.get('/api/pledges', { params }),
  getMyPledges: () => api.get('/api/pledges/my-pledges'),
  create: (pledgeData) => api.post('/api/pledges', pledgeData),
  update: (id, updates) => api.put(`/api/pledges/${id}`, updates),
  delete: (id) => api.delete(`/api/pledges/${id}`),
  getStats: () => api.get('/api/pledges/stats/summary'),
};

// Statistics API
export const statisticsAPI = {
  getAll: () => api.get('/api/statistics'),
  getGlobalStats: () => api.get('/api/statistics/global'),
};

// Health check
export const healthAPI = {
  check: () => api.get('/api/health'),
};

export default api;
