import { FaBars, FaBell } from "react-icons/fa";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
  onMenuClick?: () => void;
  courseTitle: string;
}

const CoursePlayerTopbar = ({ onMenuClick, courseTitle }: Props) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white px-4 md:px-6 py-4 flex items-center justify-between border-b shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          aria-label="Toggle menu"
        >
          <FaBars className="text-gray-600 text-xl" />
        </button>

        <button
          onClick={() => navigate("/student/dashboard")}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
          aria-label="Back to dashboard"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>

        <div className="hidden md:block">
          <h1 className="text-sm font-semibold text-gray-800 line-clamp-1">
            {courseTitle}
          </h1>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 relative">
        {/* Notification */}
        <button className="p-2 hover:bg-gray-100 rounded-lg relative">
          <FaBell className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Profile */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100"
        >
          <img
            src={user?.avatar ?? "https://i.pravatar.cc/40"}
            className="w-8 h-8 rounded-full object-cover"
            alt={user?.name}
          />
          <span className="hidden md:block text-sm font-medium text-gray-700">
            {user?.name?.split(" ")[0]}
          </span>
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-lg border z-50"
            onMouseLeave={() => setOpen(false)}
          >
            <div className="p-4 border-b">
              <p className="font-semibold text-gray-800 text-sm">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>

            <button
              onClick={() => navigate("/student/dashboard")}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/student/profile")}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm"
            >
              Profile
            </button>

            <button
              onClick={logout}
              className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 text-sm border-t"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default CoursePlayerTopbar;
