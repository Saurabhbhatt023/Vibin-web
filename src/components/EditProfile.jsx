import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import PropTypes from "prop-types";
import UserCard from "./UserCard";

function EditProfile({ user }) {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age ? user.age.toString() : "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [location, setLocation] = useState(user.location || "");
  const [relationshipStatus, setRelationshipStatus] = useState(user.relationshipStatus || "");
  const [hobbies, setHobbies] = useState(user.hobbies || []);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  // Create live preview data object that updates in real-time
  const livePreviewData = {
    firstName, 
    lastName, 
    age: age ? parseInt(age) : undefined, 
    gender, 
    about, 
    photoUrl,
    skills,
    location,
    relationshipStatus,
    hobbies,
    emailId: user.emailId // Keep the original email
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initialize form with user data when available
  useEffect(() => {
    if (user) {
      console.log("User data in EditProfile:", user);
      
      // Set form fields from user data
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age ? user.age.toString() : "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setPhotoUrl(user.photoUrl || "");
      setSkills(user.skills || []);
      setLocation(user.location || "");
      setRelationshipStatus(user.relationshipStatus || "");
      setHobbies(user.hobbies || []);
      setImageError(false);
    }
  }, [user]);

  // More permissive URL validation - accepts any URL as long as it's syntactically valid
  const validateImageUrl = (url) => {
    if (!url) return true; // Empty URL is valid
    
    // Basic URL validation
    try {
      new URL(url);
      return true; // If we can create a URL object, it's valid enough
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    // Basic validation
    if (photoUrl && !validateImageUrl(photoUrl)) {
      setError("Please enter a valid URL for your profile picture");
      setLoading(false);
      return;
    }

    try {
      // Create complete update data object including all fields that backend accepts
      const updateData = { 
        firstName, 
        lastName, 
        age: age ? parseInt(age) : undefined, 
        gender, 
        about, 
        photoUrl,
        skills,
        location,
        // Only include relationshipStatus if it's not empty
        ...(relationshipStatus ? { relationshipStatus } : {}),
        hobbies
      };
      
      console.log("Submitting profile data:", updateData);
      
      const res = await axios.patch(
        BASE_URL + "/profile/update",
        updateData,
        { withCredentials: true }
      );

      if (res.data) {
        console.log("Profile update response:", res.data);
        
        let updatedUserData;
        
        // Handle different response formats
        if (res.data.data) {
          // If backend returns data in a nested 'data' property
          updatedUserData = res.data.data;
        } else {
          // Create a complete user object with all existing data plus updated fields
          updatedUserData = {
            ...user,
            ...updateData
          };
        }
        
        console.log("Updating Redux store with:", updatedUserData);
        
        // Update Redux store with the new user data
        dispatch(addUser(updatedUserData));
        setSuccess(true);
        
        // Set timeout to allow user to see success message
        setTimeout(() => {
          // Force refresh of the profile page
          navigate("/profile", { replace: true });
        }, 1000);
      }
    } catch (err) {
      console.error("Profile update error:", err);
      console.error("Error details:", err.response?.data);
      // Show error to user
      setError(err.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
    // Don't set an error message here, just show a placeholder
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 rounded-lg">
      {/* Form Section */}
      <div className="card w-full md:w-2/3 bg-white shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit Profile</h2>
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
            <span className="block sm:inline">Profile updated successfully!</span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-bordered w-full"
              min="18"
            />
          </div>

          <div className="form-control">
            <label className="label">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">About</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="textarea textarea-bordered w-full"
              rows="3"
              maxLength="500"
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">Profile Picture URL</label>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => {
                setPhotoUrl(e.target.value);
                setImageError(false); // Reset error state when URL changes
              }}
              className="input input-bordered w-full"
              placeholder="https://example.com/your-image.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter any valid image URL. The image will be displayed if it loads successfully.
            </p>
            <div className="mt-2">
              <p className="text-xs mb-1">Preview:</p>
              {photoUrl ? (
                <img 
                  src={imageError ? "https://via.placeholder.com/150" : photoUrl} 
                  alt="Profile Preview" 
                  className="w-24 h-24 rounded-full object-cover"
                  onError={handleImageError}
                />
              ) : (
                <img 
                  src="https://via.placeholder.com/150" 
                  alt="Profile Preview Placeholder" 
                  className="w-24 h-24 rounded-full object-cover"
                />
              )}
              {photoUrl && imageError && (
                <p className="text-amber-500 text-xs mt-1">
                  Image couldn't be loaded. It will use a placeholder until a valid image is provided.
                </p>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
      
      {/* Live Preview Section */}
      <div className="w-full md:w-1/3">
        <div className="sticky top-4">
          <h3 className="text-xl font-bold text-white text-center mb-4">Live Preview</h3>
          <UserCard user={livePreviewData} />
        </div>
      </div>
    </div>
  );
}

// Add PropTypes validation
EditProfile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gender: PropTypes.string,
    about: PropTypes.string,
    photoUrl: PropTypes.string,
    emailId: PropTypes.string,
    skills: PropTypes.array,
    location: PropTypes.string,
    relationshipStatus: PropTypes.string,
    hobbies: PropTypes.array,
  }),
};

export default EditProfile;