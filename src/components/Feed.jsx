import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const feed = useSelector((store) => store.feed);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFeed = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      
      console.log("Feed data received:", res.data);
      
      if (res.data && (Array.isArray(res.data) || Array.isArray(res.data.data))) {
        dispatch(addFeed(res.data));
      } else {
        console.error("Invalid feed data format:", res.data);
        setError("Received invalid data format from server");
      }
    } catch (err) {
      console.error("Error fetching feed:", err);
      setError("Failed to load feed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!feed || !Array.isArray(feed) || feed.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">No users found in feed</div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 p-8">
      {feed.map((user, index) => (
        <UserCard key={user._id || index} user={user} />
      ))}
    </div>
  );
};

export default Feed;