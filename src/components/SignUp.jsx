import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const SignUp = ({ onToggleView }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validatePassword = () => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    
    if (!validatePassword()) {
      setError("Password must be at least 8 characters and include uppercase, lowercase, number, and special character");
      setLoading(false);
      return;
    }
    
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        emailId: email,
        password
      });
      
      console.log("Signup response:", res.data);
      
      if (res.data && res.data.success) {
        // After successful signup, automatically log in the user
        const loginRes = await axios.post(BASE_URL + "/login", {
          emailId: email,
          password
        }, { withCredentials: true });
        
        console.log("Auto-login response:", loginRes.data);
        
        let userData;
        
        // Check for different response formats
        if (loginRes.data.data) {
          userData = loginRes.data.data;
        } else {
          userData = loginRes.data;
        }
        
        // Dispatch user data to Redux store
        dispatch(addUser(userData));
        
        // Navigate to profile page
        navigate('/profile');
      } else {
        setError("Signup successful but unable to log in automatically");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
      
      {/* Display error message if there is one */}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>}
      
      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 font-semibold">First Name</span>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 font-semibold">Last Name</span>
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">Email</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">Password</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <label className="label">
            <span className="label-text-alt text-gray-500">
              Must be at least 8 characters with uppercase, lowercase, number and special character
            </span>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">Confirm Password</span>
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <button 
          type="submit" 
          className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Already have an account? <button onClick={onToggleView} className="text-primary font-semibold hover:underline">Login</button>
      </p>
    </div>
  );
};

export default SignUp;