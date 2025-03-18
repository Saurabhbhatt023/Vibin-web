// Dynamically select the correct API URL based on environment
const isDevelopment = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';

// Include the /api prefix in both URLs since your backend routes use this prefix
export const BASE_URL = isDevelopment
  ? "/api"  // When in development, use relative path because of the Vite proxy
  : "https://viben-backend.onrender.com/api";