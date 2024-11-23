import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "../components/header.tsx";
import RegisterPage from "../pages/register/RegisterPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
    },
    {
        path: '/signup',
        element: <RegisterPage />,
    },
]);

const AppRouter: React.FC = () => {
    return <RouterProvider router={router} />
}

export default AppRouter;
