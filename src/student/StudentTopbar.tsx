import { FaBars, FaBell, FaSearch } from "react-icons/fa";
import { useAuth } from "../auth/AuthContext";

interface Props {
  onMenuClick?: () => void; // ✅ Make it optional
}

const StudentTopbar = ({ onMenuClick }: Props) => {
  const { user } = useAuth();

  return (
    <header className="bg-white px-6 py-4 flex items-center justify-between border-b">
      <div className="flex items-center gap-4">
        {/* ✅ Only show hamburger if onMenuClick is provided */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Toggle menu"
          >
            <FaBars className="text-gray-600 text-xl" />
          </button>
        )}

        <div className="relative">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            placeholder="কোর্স সার্চ করুন"
            className="pl-10 pr-4 py-2 border rounded-full text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <FaBell className="text-gray-500" />

        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
          <img
            src={user?.avatar ?? "https://i.pravatar.cc/40"}
            className="w-8 h-8 rounded-full"
            alt={user?.name}
          />

          <span className="text-sm font-medium">{user?.name}</span>
        </div>
      </div>
    </header>
  );
};

export default StudentTopbar;
