import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";  // Import action to remove user

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("Current user in Navbar:", user);
  const handleLogout = () => {
    // First dispatch the action to clear the user state
    dispatch(removeUser());
    
    // Then immediately navigate to login
    navigate("/login");
    
    // Finally make the API call
    axios.post(BASE_URL + "/logout", {}, { withCredentials: true })
      .catch(err => {
        console.error("Logout error:", err);
      });
  };
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-4xl from-neutral-200">
          Viben
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div>
        {user ? (
          <div className="dropdown dropdown-end">
            <p className="mr-2">Welcome, {user.firstName || "User"}</p>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="User avatar" src={user.photoUrl || "https://via.placeholder.com/40"} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a href="#">Settings</a>
              </li>
              <li>
                <button className="btn w-full text-left" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
