// src/utils/constant.js
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const BASE_URL = isDevelopment 
  ? "/api"  // Use relative path with Vite proxy in development
  : "https://viben-backend.onrender.com/api";