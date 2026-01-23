import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import ProtectedRoute from "../auth/ProtectedRoute";
import MainLayout from "../components/layout/MainLayout";
import StudentLayout from "../layouts/StudentLayout";
import PageLoadingSkeleton from "../components/PageLoadingSkeleton";

// Lazy load pages for better performance
const Home = lazy(() => import("../pages/public/Home"));
const Courses = lazy(() => import("../pages/public/Courses"));
const CourseDetails = lazy(() => import("../pages/public/CourseDetails"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const StudentDashboard = lazy(() => import("../pages/student/Dashboard"));
const CertificateView = lazy(() => import("../pages/student/CertificateView"));
const StudentCoursePlayer = lazy(() => import("../pages/student/StudentCoursePlayer"));

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<PageLoadingSkeleton />}>
            <Home />
          </Suspense>
        )
      },
      {
        path: "/courses",
        element: (
          <Suspense fallback={<PageLoadingSkeleton />}>
            <Courses />
          </Suspense>
        )
      },
      {
        path: "/courses/:slug",
        element: (
          <Suspense fallback={<PageLoadingSkeleton />}>
            <CourseDetails />
          </Suspense>
        )
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<PageLoadingSkeleton />}>
            <Login />
          </Suspense>
        )
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<PageLoadingSkeleton />}>
            <Register />
          </Suspense>
        )
      },
    ],
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute>
        <StudentLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<PageLoadingSkeleton />}>
            <StudentDashboard />
          </Suspense>
        )
      }
    ],
  },
  {
    path: "/student/courses/:courseId",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<PageLoadingSkeleton />}>
          <StudentCoursePlayer />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/student/courses/:courseId/certificate",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<PageLoadingSkeleton />}>
          <CertificateView />
        </Suspense>
      </ProtectedRoute>
    ),
  },
]);
