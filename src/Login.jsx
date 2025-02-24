import axios from "axios";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("Ronaldo121@gmail.com");
  const [password, setPassword] = useState("$Ronaldo123");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:7777/login", {
        emailId: email,
        password,
      }, {withCredentials : true});
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="card w-full max-w-md bg-white shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
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
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <a href="#" className="text-primary font-semibold hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}