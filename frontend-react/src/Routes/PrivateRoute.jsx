import { Navigate, useLocation } from "react-router-dom";
import LoadingSpin from "../components/LoadingSpin";
import useAuth from "../hook/useAuth";
import toast from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpin />
      </div>
    );
  }
  if (user) {
    return children;
  } else {
    // toast("Please login first!");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default PrivateRoute;
