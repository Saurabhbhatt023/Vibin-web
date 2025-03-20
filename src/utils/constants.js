const isDevelopment = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

export const BASE_URL = isDevelopment
  ? "http://localhost:7777/api"  // ✅ Local Backend (Includes `/api`)
  : "https://viben-backend.onrender.com/api";  // ✅ Render Backend

// ✅ Add API_URL if used in frontend (optional)
export const API_URL = BASE_URL;
