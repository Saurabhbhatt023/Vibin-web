import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import EditProfile from "./EditProfile";
import { useEffect, useState } from "react";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [imageError, setImageError] = useState(false);

  // Debug what's in the Redux store
  useEffect(() => {
    console.log("Profile component - User data:", user);
  }, [user]);

  // Redirect to login if not authenticated
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Your Profile
        </h2>
        
        {/* Display current profile info */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
              {!imageError ? (
                <img 
                  src={user.photoUrl || "https://via.placeholder.com/150"} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
                  onError={(e) => {
                    console.warn("Failed to load profile image, using placeholder");
                    setImageError(true);
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              ) : (
                <img 
                  src="https://via.placeholder.com/150"
                  alt="Profile placeholder" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
                />
              )}
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold">{user.firstName || ""} {user.lastName || ""}</h3>
              <p className="text-gray-600">{user.emailId || ""}</p>
              {user.gender && <p className="text-gray-700 mt-2"><span className="font-semibold">Gender:</span> {user.gender}</p>}
              {user.age && <p className="text-gray-700"><span className="font-semibold">Age:</span> {user.age}</p>}
              {user.about && (
                <div className="mt-4">
                  <h4 className="font-semibold">About</h4>
                  <p className="text-gray-700">{user.about}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <EditProfile user={user} />
      </div>
    </div>
  );
};

export default Profile;