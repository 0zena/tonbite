import { ProtectedRoute } from "../components";
import {
    HomePage,
    LoginPage,
    NotFoundError,
    ProfileManagePage,
    ProfilePage,
    RegisterPage,
    CreateCoursePage,
    CoursePage,
} from "../pages";
import {CreateCourseStepPage} from "../pages/courseStep/CreateCourseStepPage.tsx";

export const publicRoutes = [
    {
        path: "/",
        element: <HomePage />,
    },
    {
      path: "*",
      element: <NotFoundError />,
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
            },
            {
                path: "/create",
                element: <CreateCoursePage />,
            },
            {
                path: "/courses/:id",
                element: <CoursePage />,
            },
            {
                path: "/courses/:id/create-step",
                element: <CreateCourseStepPage />,
            },
        ],
    },
];