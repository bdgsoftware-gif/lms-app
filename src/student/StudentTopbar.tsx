import { FaBell, FaSearch } from "react-icons/fa";
import { useAuth } from "../auth/AuthContext";

const StudentTopbar = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white px-6 py-4 flex items-center justify-between border-b">
      <div className="relative">
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
        <input
          placeholder="কোর্স সার্চ করুন"
          className="pl-10 pr-4 py-2 border rounded-full text-sm"
        />
      </div>

      <div className="flex items-center gap-4">
        <FaBell className="text-gray-500" />

        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
          <img
            src="https://i.pravatar.cc/40"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium">{user?.name}</span>
        </div>
      </div>
    </header>
  );
};

export default StudentTopbar;
