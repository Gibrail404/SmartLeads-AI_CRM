import axios from 'axios';

const isProd = window.location.hostname !== 'localhost';

const baseURL = isProd
  ? 'https://smartleads-ai-crm.onrender.com/api/v1'
  : 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
