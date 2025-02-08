import { ProtectedRoute } from "../components";
import { HomePage, LoginPage, ProfileManagePage, ProfilePage, RegisterPage } from "../pages";

export const publicRoutes = [
    {
        path: "/",
        element: <HomePage />
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