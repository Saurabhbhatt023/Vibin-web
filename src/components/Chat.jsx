import { useSelector } from "react-redux";

const Chat = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <p>Welcome to the chat, {user?.firstName || 'User'}!</p>
        {/* Your chat functionality goes here */}
      </div>
    </div>
  );
};

export default Chat;