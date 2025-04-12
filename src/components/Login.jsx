import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL, configureAxios } from "../utils/constants";
import SignUp from "./SignUp";

// Configure axios defaults
configureAxios(axios);

export default function LoginPage() {
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState( );
  const [password, setPassword] = useState("$Bill2024");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleView = () => {
    setShowLogin(!showLogin);
    setError(""); // Clear errors when switching views
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      // Clear any existing authentication data first
      localStorage.removeItem('isLoggedIn');
      
      // Attempt logout to clear any existing cookies
      try {
        await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      } catch (logoutErr) {
        // Ignore errors here, just trying to clean state
        console.log("Pre-login cleanup attempt, ignoring error:", logoutErr.message);
      }
      
      const loginURL = `${BASE_URL}/login`;
      console.log("Making login request to:", loginURL);
  
      const res = await axios.post(loginURL, {  
        emailId: email,
        password,
      }, { 
        withCredentials: true // This is important for cookies to be set
      });
  
      console.log("Login response:", res.data);
  
      // Check if response has data in expected format
      const userData = res.data?.data || res.data;
      
      if (userData) {
        // Update Redux store with user data
        dispatch(addUser(userData));
        
        // Set a flag in localStorage to indicate successful login
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirect to home
        navigate("/");
      } else {
        setError("Login successful but user data is missing.");
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data || 
                          "Login failed. Please check your credentials and try again.";
      setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="card w-full max-w-md bg-white shadow-xl p-8">
        {showLogin ? (
          <>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

            {/* Display error message if exists */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700 font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="mt-4 text-center text-gray-600">
              Don't have an account?{" "}
              <button onClick={toggleView} className="text-primary font-semibold hover:underline">
                Sign up
              </button>
            </p>
          </>
        ) : (
          <SignUp onToggleView={toggleView} />
        )}
      </div>
    </div>
  );
}