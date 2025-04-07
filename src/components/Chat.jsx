import { useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  // Get targetUserId from URL params
  const { userId: targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [chatPartner, setChatPartner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Redirect to login if not authenticated
  if (!user) return <Navigate to="/login" />;

  // Setup socket connection
  useEffect(() => {
    if (!userId || !targetUserId) {
      return;
    }
    
    // Create socket connection
    const socket = createSocketConnection();
    socketRef.current = socket;
    
    // Join the chat room
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId
    });
    
    // Listen for incoming messages
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          _id: Date.now().toString(), // Temporary ID
          senderId: message.userId,
          content: message.text,
          createdAt: new Date().toISOString()
        }
      ]);
    });
    
    // Cleanup on unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, [userId, targetUserId, user.firstName]);

  // Fetch chat partner info if targetUserId is provided
  useEffect(() => {
    const fetchChatPartner = async () => {
      if (!targetUserId) return;
      
      try {
        setLoading(true);
        // Fetch user details by ID
        const res = await axios.get(`${BASE_URL}/user/${targetUserId}`, { 
          withCredentials: true 
        });
        
        if (res.data && res.data.data) {
          setChatPartner(res.data.data);
        }
        
        // Also fetch previous messages
        fetchMessages();
      } catch (err) {
        console.error("Error fetching chat partner:", err);
        setError("Failed to load user information");
      } finally {
        setLoading(false);
      }
    };

    fetchChatPartner();
  }, [targetUserId]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to fetch messages
  const fetchMessages = async () => {
    if (!targetUserId) return;
    
    try {
      // Fetch chat messages
      const res = await axios.get(`${BASE_URL}/messages/${targetUserId}`, { 
        withCredentials: true 
      });
      
      if (res.data && res.data.data) {
        setMessages(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages");
    }
  };

  // Function to send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !targetUserId) return;
    
    try {
      // Send message via socket
      socketRef.current.emit("sendMessage", {
        firstName: user.firstName,
        userId,
        targetUserId,
        text: newMessage
      });
      
      // Also send via API for persistence
      await axios.post(`${BASE_URL}/messages`, {
        recipientId: targetUserId,
        content: newMessage
      }, { 
        withCredentials: true 
      });
      
      // Add the new message to the local state
      setMessages([
        ...messages,
        {
          _id: Date.now().toString(), // Temporary ID
          senderId: userId,
          content: newMessage,
          createdAt: new Date().toISOString()
        }
      ]);
      
      // Clear the input
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message");
    }
  };

  // If no targetUserId is provided, show a list of recent conversations
  if (!targetUserId) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Conversations</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p>Select a connection to start chatting</p>
          <div className="mt-4">
            <a href="/connections" className="text-blue-500 hover:underline">
              Go to your connections
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Display loading state
  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg">
        {/* Chat header */}
        <div className="border-b p-4 flex items-center">
          <img 
            src={chatPartner?.photoUrl || "https://via.placeholder.com/40"} 
            alt="Profile" 
            className="w-10 h-10 rounded-full mr-3"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/40";
            }}
          />
          <div>
            <h2 className="font-semibold">
              {chatPartner?.firstName} {chatPartner?.lastName}
            </h2>
            {chatPartner?.about && (
              <p className="text-sm text-gray-500">{chatPartner.about}</p>
            )}
          </div>
        </div>
        
        {/* Chat messages */}
        <div className="h-96 overflow-y-auto p-4 flex flex-col space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 my-20">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((message) => (
              <div 
                key={message._id}
                className={`max-w-3/4 p-3 rounded-lg ${
                  message.senderId === userId 
                    ? "bg-blue-100 self-end" 
                    : "bg-gray-100 self-start"
                }`}
              >
                {message.content}
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(message.createdAt).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message input */}
        <form onSubmit={handleSendMessage} className="border-t p-4 flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700 transition"
          >
            Send
          </button>
        </form>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
          {error}
        </div>
      )}
    </div>
  );
};

export default Chat;