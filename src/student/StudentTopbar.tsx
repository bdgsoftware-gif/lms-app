import { useState } from "react";
import { FaBars, FaBell } from "react-icons/fa";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

interface Props {
  title?: string;
  onMenuClick?: () => void;
}

const StudentTopbar = ({ title, onMenuClick }: Props) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <FaBars className="text-gray-700" />
          </button>
        )}

        <h1 className="text-sm md:text-base font-semibold text-gray-800 truncate max-w-[180px] md:max-w-none">
          {title ?? "Student Dashboard"}
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 relative">
        <button className="p-2 rounded-lg hover:bg-gray-100 relative">
          <FaBell className="text-gray-600" />
          {/* unread dot */}
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

export default StudentTopbar;
