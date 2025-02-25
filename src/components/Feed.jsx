import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login if no user is logged in
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Don't render anything if no user (will redirect)
  if (!user) return null;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Hello {user?.firstName}, Welcome to Your Feed!</h1>
      
      {/* Feed content goes here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Discover People</h2>
          <p className="text-gray-600">Find people with similar interests</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Messages</h2>
          <p className="text-gray-600">You have no new messages</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Your Matches</h2>
          <p className="text-gray-600">Start connecting with your matches</p>
        </div>
      </div>
    </div>
  );
};

export default Feed;