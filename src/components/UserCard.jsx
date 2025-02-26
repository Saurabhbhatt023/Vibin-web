import React from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes

const UserCard = ({ user }) => {
  console.log("User data received in UserCard:", user);

  // Fallback values for missing data
  const firstName = user?.firstName || "User";
  const lastName = user?.lastName || "";
  const photoUrl = user?.photoUrl || "https://via.placeholder.com/150";
  const emailId = user?.emailId || "No email provided";
  const about = user?.about || "No information provided";

  return (
    <div className="w-80 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-4 rounded-2xl shadow-lg text-white">
      <div className="relative">
        {/* User Image */}
        <img
          src={photoUrl}
          alt="User"
          className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg object-cover"
        />
      </div>

      {/* User Details */}
      <div className="text-center mt-4">
        <h2 className="text-2xl font-bold">{firstName} {lastName}</h2>
        <p className="text-sm text-gray-200">{emailId}</p>
        <p className="mt-2 text-sm">{about}</p>
      </div>

      {/* Buttons (Like & Dislike) */}
      <div className="flex justify-center gap-6 mt-4">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-md">
          ❤️ Like
        </button>
        <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full shadow-md">
          ❌ Dislike
        </button>
      </div>
    </div>
  );
};

// ✅ Define PropTypes
UserCard.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string,
    photoUrl: PropTypes.string,
    emailId: PropTypes.string,
    about: PropTypes.string,
  }),
};

export default UserCard;
