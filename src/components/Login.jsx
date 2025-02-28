import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

export default function LoginPage() {
  const [email, setEmail] = useState("Raju2@apple.com");
  const [password, setPassword] = useState("$Bheem2024");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId: email,
        password,
      }, { withCredentials: true });
      
      console.log("Login response:", res.data);
     
      if (res.data) {
        let userData;
        
        // Check for different response formats
        if (res.data.data) {
          userData = res.data.data;
        } else {
          userData = res.data;
        }
        
        // Make sure user data has required fields
        if (!userData.firstName) {
          console.warn("User data missing required fields:", userData);
          setError("Login successful but user data is incomplete");
          setLoading(false);
          return;
        }
        
        // Dispatch complete user data to Redux store
        dispatch(addUser(userData));
        
        // Navigate to feed page
        navigate('/');
      } else {
        setError("Login successful but no user data received");
      }
    } catch (err) {
      console.error("Login error:", err);
      // Extract the error message from the response or use a default message
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="card w-full max-w-md bg-white shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        
        {/* Display error message if there is one */}
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>}
        
        <form onSubmit={handleLogin} className="space-y-4">
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
          </div>
          <button 
            type="submit" 
            className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <a href="#" className="text-primary font-semibold hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}