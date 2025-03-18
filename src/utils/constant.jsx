export const BASE_URL = location.hostname === "localhost"
  ? "http://localhost:7777"  // Use local backend for development
  : "https://viben-backend.onrender.com/api";  // Use Render backend for production
