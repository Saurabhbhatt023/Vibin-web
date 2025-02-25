import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((store) => store.user);

  // Redirect to login if not authenticated
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-6 md:mb-0 md:mr-8">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img 
                src={user.photoUrl || "https://via.placeholder.com/128"} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{user.firstName} {user.lastName}</h1>
            <p className="text-gray-600 mb-4">{user.email || user.emailId}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                <p><span className="font-medium">Email:</span> {user.email || user.emailId}</p>
                <p><span className="font-medium">Location:</span> {user.location || "Not specified"}</p>
                <p><span className="font-medium">Member since:</span> {user.joinDate || "2025"}</p>
              </div>
            </div>
            
            <button className="btn btn-primary">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;