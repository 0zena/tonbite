import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "../components/header.tsx";
import RegisterPage from "../pages/register/RegisterPage.tsx";
import LoginPage from "../pages/login/LoginPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    }
]);

const AppRouter: React.FC = () => {
    return <RouterProvider router={router} />
}

export default AppRouter;
