import { useAuth } from "../../provider/AuthProvider.tsx";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated)
        return <Navigate to="/login" />;

    return <Outlet />;
};