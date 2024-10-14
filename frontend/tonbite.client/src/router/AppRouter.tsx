import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "../components/header.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Header />
    },
]);

const AppRouter: React.FC = () => {
    return <RouterProvider router={router} />
}

export default AppRouter;

