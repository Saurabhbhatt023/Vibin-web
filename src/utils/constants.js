// More reliable environment detection
const isDevelopment = window.location.hostname === "localhost" || 
                      window.location.hostname === "127.0.0.1";

// Base URL for API calls
export const BASE_URL = isDevelopment
  ? "http://localhost:7777/api"
  : "https://viben-backend.onrender.com/api";

// Export API_URL for consistency
export const API_URL = BASE_URL;

// Add axios default configuration
export const configureAxios = (axios) => {
  axios.defaults.withCredentials = true; // Always send cookies
  
  // Set common headers
  axios.defaults.headers.common['Accept'] = 'application/json';
  
  // Add request interceptor for debugging
  axios.interceptors.request.use(
    (config) => {
      console.log(`Request to ${config.url} with credentials:`, config.withCredentials);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Add response interceptor for debugging
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.error('API Error:', error.response?.status, error.response?.data);
      return Promise.reject(error);
    }
  );
};