import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { publicRoutes, anonymousOnlyRoutes, authorizedRoutes } from "./AppRoutes.tsx";

import { useAuth } from "../provider/AuthProvider.tsx";

const AppRouter: React.FC = () => {
    const { isAuthenticated } = useAuth();

    const router = createBrowserRouter([
        ...publicRoutes,
        ...(!isAuthenticated ? anonymousOnlyRoutes : []),
        ...authorizedRoutes,
    ]);

    return <RouterProvider router={router} />
}

export default AppRouter;
