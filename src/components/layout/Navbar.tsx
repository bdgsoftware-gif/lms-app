import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { fetchCourses } from "../../api/course.api";
import Logo from "../../assets/logo.png";

interface Course {
  id: number;
  title: string;
  slug: string;
}

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const [coursesDropdown, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchCourses();
        setCourses(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    load();
  }, []);

  return (
    <header className="bg-white shadow-sm border-b-2 border-[#DCE5E1]">
      <div className="max-w-8xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="C M Moin Academy Logo" className="h-12 w-auto" />
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex gap-8 text-base font-inter">
          <Link
            to="/"
            className={`relative py-1 text-gray-700 hover:text-text-primary transition-colors ${
              isActive("/") ? "text-text-primary font-semibold" : ""
            }`}
          >
            হোম
            {isActive("/") && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-text-primary"></span>
            )}
          </Link>

          {/* Courses Dropdown */}
          <div className="relative group">
            <Link
              to="/courses"
              className={`flex items-center gap-1 py-1 text-gray-700 hover:text-text-primary transition-colors ${
                isActive("/courses") ? "text-text-primary font-medium" : ""
              }`}
            >
              কোর্স সমূহ
              <svg
                className={`w-4 h-4 transition-transform group-hover:rotate-180 ${
                  isActive("/courses") ? "text-text-primary" : "text-gray-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Link>

            {/* Dropdown Menu */}
            <div className="absolute left-0 top-full mt-2 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
              {coursesDropdown.map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.slug}`}
                  className={`block px-4 py-3 hover:bg-green-50 transition-colors border-l-4 ${
                    isActive(`/courses/${course.slug}`)
                      ? "border-text-primary bg-green-50 text-text-primary font-medium"
                      : "border-transparent text-gray-700"
                  }`}
                >
                  {course.title}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/about"
            className={`relative py-1 text-gray-700 hover:text-text-primary transition-colors ${
              isActive("/about") ? "text-text-primary font-medium" : ""
            }`}
          >
            আমাদের সম্পর্কে
            {isActive("/about") && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-text-primary"></span>
            )}
          </Link>

          <Link
            to="/contact"
            className={`relative py-1 text-gray-700 hover:text-text-primary transition-colors ${
              isActive("/contact") ? "text-text-primary font-medium" : ""
            }`}
          >
            যোগাযোগ করুন
            {isActive("/contact") && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-text-primary"></span>
            )}
          </Link>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3 font-inter">
          {!user ? (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 font-inter text-gray-700 hover:text-text-primary transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                লগইন
              </Link>

              {/* Divider */}
              <span className="h-6 w-px bg-gray-300 hidden md:block"></span>

              <Link
                to="/register"
                className=" hidden md:flex px-6 py-3 font-inter text-white rounded-3xl bg-button-primary hover:bg-button-accent transition-colors items-center gap-2"
              >
                সাইন আপ
              </Link>
            </>
          ) : (
            <div className="relative group py-2 px-4 bg-bg-card rounded-full">
              <div className="flex justify-between items-center gap-2 ">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-5 h-5 object-cover rounded-full"
                  />
                ) : (
                  <span className="text-lg font-medium text-gray-700">
                    {user.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 inline-flex"
                  viewBox="0 0 32 32"
                >
                  <g data-name="Layer 2">
                    <path
                      fill="#2f7c74"
                      d="M23.625 29.677a1.86 1.86 0 0 1-1.315-.544l-4.47-4.47a3.94 3.94 0 0 1 .599-6.059 4 4 0 0 1 5.05.579l.136.136.137-.136a3.995 3.995 0 0 1 5.05-.577 3.937 3.937 0 0 1 .598 6.057l-4.469 4.47a1.86 1.86 0 0 1-1.316.544m-3.062-10.212a2.27 2.27 0 0 0-1.282.382 2.438 2.438 0 0 0-.38 3.756l4.47 4.47a.36.36 0 0 0 .51 0l4.469-4.47a2.437 2.437 0 0 0-.38-3.755 2.52 2.52 0 0 0-3.147.395l-.667.667a.75.75 0 0 1-1.06 0l-.668-.667a2.66 2.66 0 0 0-1.865-.778"
                      data-original="#7fbde7"
                    />
                    <path
                      d="M13 14.75H4A1.75 1.75 0 0 1 2.25 13V4A1.75 1.75 0 0 1 4 2.25h9A1.75 1.75 0 0 1 14.75 4v9A1.75 1.75 0 0 1 13 14.75m-9-11a.25.25 0 0 0-.25.25v9a.25.25 0 0 0 .25.25h9a.25.25 0 0 0 .25-.25V4a.25.25 0 0 0-.25-.25zm9 26H4A1.75 1.75 0 0 1 2.25 28v-9A1.75 1.75 0 0 1 4 17.25h9A1.75 1.75 0 0 1 14.75 19v9A1.75 1.75 0 0 1 13 29.75m-9-11a.25.25 0 0 0-.25.25v9a.25.25 0 0 0 .25.25h9a.25.25 0 0 0 .25-.25v-9a.25.25 0 0 0-.25-.25zm24-4h-9A1.75 1.75 0 0 1 17.25 13V4A1.75 1.75 0 0 1 19 2.25h9A1.75 1.75 0 0 1 29.75 4v9A1.75 1.75 0 0 1 28 14.75m-9-11a.25.25 0 0 0-.25.25v9a.25.25 0 0 0 .25.25h9a.25.25 0 0 0 .25-.25V4a.25.25 0 0 0-.25-.25z"
                      fill="#1f2a24"
                      data-original="#232323"
                    />
                  </g>
                </svg>
              </div>

              {/* Hover Menu */}
              <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto border border-gray-100 z-50">
                <div className="p-4 border-b">
                  <div className="user-card flex items-center justify-start gap-3">
                    <img
                      src={user?.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="details">
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
                <Link
                  to="/student/dashboard"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors font-inter text-gray-700"
                >
                  <svg
                    className="w-5 h-5 text-text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 font-inter text-red-600 hover:bg-red-50 transition-colors border-t"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
