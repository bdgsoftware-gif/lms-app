import { FaBars, FaBell } from "react-icons/fa";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

interface Props {
  onMenuClick: () => void;
  courseTitle: string;
}

const CoursePlayerTopbar = ({ onMenuClick, courseTitle }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();

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

      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
          <FaBell className="text-gray-600 text-lg" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
          <img
            src={user?.avatar ?? "https://i.pravatar.cc/40"}
            className="w-7 h-7 rounded-full"
            alt={user?.name}
          />
          <span className="text-sm font-medium hidden sm:inline">
            {user?.name}
          </span>
        </div>
      </div>
    </header>
  );
};

export default CoursePlayerTopbar;
