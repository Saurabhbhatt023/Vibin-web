import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const [imageError, setImageError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionStatus, setActionStatus] = useState(null);
  const dispatch = useDispatch();

  console.log("User data received in UserCard:", user);

  // Fallback values for missing data
  const firstName = user?.firstName || "User";
  const lastName = user?.lastName || "";
  const photoUrl = user?.photoUrl || "https://via.placeholder.com/150";
  const emailId = user?.emailId || "No email provided";
  const about = user?.about || "No information provided";
  const age = user?.age ? `Age: ${user.age}` : "";
  const gender = user?.gender ? `Gender: ${user.gender}` : "";
  const userId = user?._id;

  const handleSendRequest = async (status) => {
    if (!userId || isProcessing) return;
    
    setIsProcessing(true);
    setActionStatus(null);
    
    try {
      // Map UI actions to API status values
      // "interested" when user clicks Accept, "ignored" when user clicks Reject
      const apiStatus = status === "accept" ? "interested" : "ignored";
      
      console.log(`Sending ${apiStatus} request for user: ${userId}`);
      
      // Using the correct endpoint format: /request/send/interested/[userId] or /request/send/ignored/[userId]
      const endpoint = `${BASE_URL}/request/send/${apiStatus}/${userId}`;
      
      const res = await axios.post(
        endpoint, 
        {}, 
        { withCredentials: true }
      );
      
      console.log(`${apiStatus} request response:`, res.data);
      
      // Remove this user from the feed in Redux store
      dispatch(removeUserFromFeed(userId));
      
      setActionStatus({ 
        type: "success", 
        message: `User ${status === "accept" ? "accepted" : "rejected"} successfully` 
      });
    } catch (err) {
      console.error(`Error sending ${status} request:`, err);
      setActionStatus({ 
        type: "error", 
        message: `Failed to process ${status} request. ${err.response?.data?.message || "Please try again."}` 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // If we've already taken an action and it was successful, we don't show the card
  if (actionStatus?.type === "success") {
    return null;
  }

  return (
    <div className="w-80 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-4 rounded-2xl shadow-lg text-white">
      <div className="relative">
        {/* User Image */}
        {!imageError ? (
          <img
            src={photoUrl}
            alt="User"
            className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg object-cover"
            onError={(e) => {
              console.warn("Failed to load user image, using placeholder");
              setImageError(true);
              e.target.src = "https://via.placeholder.com/150";
            }}
          />
        ) : (
          <img
            src="https://via.placeholder.com/150"
            alt="User placeholder"
            className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg object-cover"
          />
        )}
      </div>

      {/* User Details */}
      <div className="text-center mt-4">
        <h2 className="text-2xl font-bold">{firstName} {lastName}</h2>
        <p className="text-sm text-gray-200">{emailId}</p>
        {(age || gender) && (
          <div className="mt-1 text-sm text-gray-200">
            {age} {age && gender && "•"} {gender}
          </div>
        )}
        <p className="mt-2 text-sm">{about}</p>
      </div>

      {/* Action Status Message */}
      {actionStatus?.type === "error" && (
        <div className="mt-2 bg-red-700 text-white p-2 rounded text-sm">
          {actionStatus.message}
        </div>
      )}

      {/* Buttons (Accept & Reject) */}
      <div className="flex justify-center gap-6 mt-4">
        <button 
          className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-md ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`} 
          onClick={() => handleSendRequest("accept")}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Accept"}
        </button>
        <button 
          className={`bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full shadow-md ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => handleSendRequest("reject")}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Reject"}
        </button>
      </div>
    </div>
  );
};

// Define PropTypes
UserCard.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    photoUrl: PropTypes.string,
    emailId: PropTypes.string,
    about: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gender: PropTypes.string,
    _id: PropTypes.string
  }).isRequired,
};

export default UserCard;