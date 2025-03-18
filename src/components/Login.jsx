import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants"; // Ensure BASE_URL is correct
import SignUp from "./SignUp";

export default function LoginPage() {
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState("Bill@gmail.com");
  const [password, setPassword] = useState("$Bill2024");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleView = () => {
    setShowLogin(!showLogin);
    setError(""); // Clear any errors when switching views
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      console.log("Making login request to:", `${BASE_URL}/api/login`);
      
      const res = await axios.post(`${BASE_URL}/api/login`, {
        emailId: email,
        password,
      }, { 
        withCredentials: true, // ✅ Allows sending cookies
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("Login response:", res.data);

      if (res.data) {
        let userData = res.data.data || res.data; // Check response structure

        if (!userData || !userData.firstName) {
          console.warn("User data missing required fields:", userData);
          setError("Login successful but user data is incomplete");
          setLoading(false);
          return;
        }

        // ✅ Store user data in Redux
        dispatch(addUser(userData));

        // ✅ Redirect to home page
        navigate("/");
      } else {
        setError("Login successful but no user data received");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
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
              Don't have an account? <button onClick={toggleView} className="text-primary font-semibold hover:underline">Sign up</button>
            </p>
          </>
        ) : (
          <SignUp onToggleView={toggleView} />
        )}
      </div>
    </div>
  );
}
