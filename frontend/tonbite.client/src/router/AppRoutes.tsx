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
    LandingPage,
    ProblemReport,
    TransactionPage,
} from "../pages";
import { ProtectedRoute, CourseLayout } from "../components";

export const publicRoutes = [
    {
        path: "/report",
        element: <ProblemReport />,
    },
    {
      path: "*",
      element: <NotFoundError />,
    },
];

export const anonymousOnlyRoutes = [
    {
        path: "/",
        element: <LandingPage />,
    },
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
                path: "/",
                element: <HomePage />,
            },
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
                path: "/transaction/:id",
                element: <TransactionPage />,
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