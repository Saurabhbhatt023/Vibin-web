// utils/socket.js (client-side)
import { io } from "socket.io-client";

let socket;

export const createSocketConnection = () => {
  if (!socket) {
    // Change this to match your actual backend server
    socket = io("http://localhost:7777", { // Changed from 3000 to 7777 to match your API
      withCredentials: true,
    });
    
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });
    
    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });
  }
  
  return socket;
};