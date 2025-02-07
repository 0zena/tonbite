import { ProtectedRoute } from "../components/auth/ProtectedRoute.tsx";

import Header from "../components/header.tsx";
import RegisterPage from "../pages/register/RegisterPage.tsx";
import LoginPage from "../pages/login/LoginPage.tsx";
import PrivatePage from "../pages/PrivatePage.tsx";
import { ProfilePage, ProfileManagePage } from "../pages/profile";

export const publicRoutes = [
    {
        path: "/",
        element: <Header />
    },
];

export const anonymousOnlyRoutes = [
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
];

export const authorizedRoutes = [
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                path: "/private",
                element: <PrivatePage />,
            },
            {
              path: "/profile",
              element: <ProfilePage />,
            },
            {
                path: "/profile/manage",
                element: <ProfileManagePage />,
            }
        ],
    },
];