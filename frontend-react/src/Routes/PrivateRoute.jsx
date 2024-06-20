
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpin from "../components/LoadingSpin";
import useAuth from "../hook/useAuth";


const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading ) {
        return <div className="min-h-screen flex items-center justify-center" >
            <LoadingSpin />
        </div>
    }
    if (user) {
        return children;
    }
    else {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

};

export default PrivateRoute;