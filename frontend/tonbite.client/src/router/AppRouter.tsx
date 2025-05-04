import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { publicRoutes, anonymousOnlyRoutes, authorizedRoutes, adminRoutes } from "./AppRoutes.tsx";
import { useAuth } from "../provider/AuthProvider.tsx";

const AppRouter: React.FC = () => {
    const { isAuthenticated, client } = useAuth();

    const router = createBrowserRouter([
        ...publicRoutes,
        ...(!isAuthenticated ? anonymousOnlyRoutes : []),
        ...authorizedRoutes,
        ...(client?.roles?.hasRole("Admin") ? adminRoutes : []),
    ]);

    return <RouterProvider router={router} />
}

export default AppRouter;
