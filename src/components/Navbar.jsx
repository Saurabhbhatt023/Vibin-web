import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(removeUser());
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };
  
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Logo and App Name */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100">
              Viben
            </span>
          </Link>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/feed" className="hover:text-purple-200 font-medium transition-colors duration-200">
            Feed
          </Link>
          
          {user ? (
            <>
              <Link to="/profile" className="hover:text-purple-200 font-medium transition-colors duration-200">
                Profile
              </Link>
              <Link to="/connections" className="hover:text-purple-200 font-medium transition-colors duration-200">
                Connections
              </Link>
              <Link to="/requests" className="hover:text-purple-200 font-medium transition-colors duration-200">
                Requests
              </Link>
              <Link to="/chat" className="hover:text-purple-200 font-medium transition-colors duration-200">
                Chat
              </Link>
              <button 
                onClick={handleLogout} 
                className="px-4 py-2 bg-white text-purple-600 rounded-md font-medium hover:bg-purple-100 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="px-4 py-2 bg-white text-purple-600 rounded-md font-medium hover:bg-purple-100 transition-colors duration-200"
            >
              Login
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Button (you'd need to implement toggle functionality) */}
        <div className="md:hidden flex items-center">
          <button className="mobile-menu-button">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu (hidden by default) */}
      <div className="hidden mobile-menu md:hidden">
        <div className="px-2 pt-2 pb-4 space-y-1 bg-purple-700">
          <Link to="/feed" className="block px-3 py-2 rounded-md text-white font-medium hover:bg-purple-600">
            Feed
          </Link>
          
          {user ? (
            <>
              <Link to="/profile" className="block px-3 py-2 rounded-md text-white font-medium hover:bg-purple-600">
                Profile
              </Link>
              <Link to="/connections" className="block px-3 py-2 rounded-md text-white font-medium hover:bg-purple-600">
                Connections
              </Link>
              <Link to="/requests" className="block px-3 py-2 rounded-md text-white font-medium hover:bg-purple-600">
                Requests
              </Link>
              <Link to="/chat" className="block px-3 py-2 rounded-md text-white font-medium hover:bg-purple-600">
                Chat
              </Link>
              <button 
                onClick={handleLogout} 
                className="block w-full text-left px-3 py-2 rounded-md text-white font-medium hover:bg-purple-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="block px-3 py-2 rounded-md text-white font-medium hover:bg-purple-600">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;