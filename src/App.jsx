import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AuthProtected = ({ children }) => {
  const user = useSelector((store) => store.user);
  const location = useLocation();
  
  if (!user) {
    // Redirect to login and store the attempted URL to redirect back after login
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
  
  return children;
};

export default AuthProtected;