import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/public/Home";
import Courses from "../pages/public/Courses";
import CourseDetails from "../pages/public/CourseDetails";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import StudentDashboard from "../pages/student/Dashboard";
import ProtectedRoute from "../auth/ProtectedRoute";
// import LessonWatch from "../pages/student/LessonWatch";
import CertificateView from "../pages/student/CertificateView";
import MainLayout from "../components/layout/MainLayout";
import StudentLayout from "../layouts/StudentLayout";
import StudentCoursePlayer from "../pages/student/StudentCoursePlayer";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/courses", element: <Courses /> },
      { path: "/courses/:slug", element: <CourseDetails /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute>
        <StudentLayout />
      </ProtectedRoute>
    ),
    children: [{ path: "dashboard", element: <StudentDashboard /> }],
  },
  {
    path: "/student/courses/:courseId",
    element: (
      <ProtectedRoute>
        <StudentCoursePlayer />
      </ProtectedRoute>
    ),
  },
  {
    path: "/student/courses/:courseId/certificate",
    element: (
      <ProtectedRoute>
        <CertificateView />
      </ProtectedRoute>
    ),
  },
]);
