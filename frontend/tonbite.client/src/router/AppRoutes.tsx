import {
    HomePage,
    BrowsePage,
    LoginPage,
    NotFoundError,
    ProfileManagePage,
    ProfilePage,
    RegisterPage,
    CreateCoursePage,
    CoursePage,
    CourseStepPage,
    CreateCourseStepPage,
} from "../pages";
import { ProtectedRoute, CourseLayout } from "../components";

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
              path: "/browse",
              element: <BrowsePage />,
            },
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
                path: "/course-step/:id",
                element: <CourseStepPage />,
            },
            {
                path: "/courses/:id",
                element: <CourseLayout />,
                children: [
                    {
                        index: true,
                        element: <CoursePage />,
                    },
                    {
                        path: "create-step",
                        element: <CreateCourseStepPage />,
                    },
                ]
            },
        ],
    },
];