import { NavLink } from "react-router-dom";
import { FaHome, FaBook, FaChartLine, FaUser } from "react-icons/fa";
import Logo from "../assets/logo.png";
const StudentSidebar = () => {
  return (
    <aside className="w-64 bg-[#F1F7F5] min-h-screen px-4 py-6 hidden md:block">
      {/* Logo */}
      <NavLink to="/" className="flex items-center justify-center">
        <img src={Logo} alt="C M Moin Academy Logo" className="h-10 w-auto" />
      </NavLink>

      {/* Menu */}
      <nav className="space-y-2 mt-12">
        <NavLink
          to="/student/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg ${
              isActive
                ? "bg-brand-primary text-white"
                : "text-gray-700 hover:bg-white"
            }`
          }
        >
          <FaHome /> হোম
        </NavLink>

        <NavLink
          to="/student/courses"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-white"
        >
          <FaBook /> আমার কোর্স
        </NavLink>

        <NavLink
          to="/student/progress"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-white"
        >
          <FaChartLine /> অগ্রগতি
        </NavLink>

        <NavLink
          to="/student/profile"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-white"
        >
          <FaUser /> প্রোফাইল
        </NavLink>
      </nav>
    </aside>
  );
};

export default StudentSidebar;
