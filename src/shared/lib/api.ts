import axios from 'axios';

export const api = axios.create({
   // Your Node.js Server URL
   baseURL: 'http://localhost:3000/api/v1',
});

api.interceptors.request.use(
   (config) => {
      // 1. Automatically handle Auth Token (Important for Admin routes)
      const token = localStorage.getItem('token');
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      // 2. Content-Type Handling
      // Note: Axios automatically handles FormData, but keeping your logic
      // ensures manual control if needed.
      if (config.data instanceof FormData) {
         config.headers['Content-Type'] = 'multipart/form-data';
      } else {
         config.headers['Content-Type'] = 'application/json';
      }

      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

// Optional: Global error handler for Node.js responses
api.interceptors.response.use(
   (response) => response,
   (error) => {
      // If Node.js returns 401 (Unauthorized), handle it here
      if (error.response?.status === 401) {
         console.error('Session expired. Please login again.');
      }
      return Promise.reject(error);
   }
);
