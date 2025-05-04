import { useAuth } from "../../provider/AuthProvider.tsx";
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoute = () => {
    const { isAuthenticated, client } = useAuth();

    if (!isAuthenticated)
        return <Navigate to="/login" />;

    if (!client?.roles?.hasRole("Admin"))
        return <Navigate to="/" />;

    return <Outlet />;
};