import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import Logo from "../../assets/logo.png";
const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const coursesDropdown = [
    { name: "All Courses", path: "/courses" },
    { name: "Web Development", path: "/courses/web-development" },
    { name: "Digital Marketing", path: "/courses/digital-marketing" },
    { name: "Graphic Design", path: "/courses/graphic-design" },
    { name: "Data Science", path: "/courses/data-science" },
  ];

  return (
    <header className="bg-white shadow-sm border-b-2 border-[#DCE5E1]">
      <div className="max-w-8xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="C M Moin Academy Logo" className="h-8 w-auto" />
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
              {coursesDropdown.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 hover:bg-green-50 transition-colors border-l-4 ${
                    isActive(item.path)
                      ? "border-text-primary bg-green-50 text-text-primary font-medium"
                      : "border-transparent text-gray-700"
                  }`}
                >
                  {item.name}
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
              <span className="h-6 w-px bg-gray-300"></span>

              <Link
                to="/register"
                className="px-6 py-3 font-inter text-white rounded-3xl bg-button-primary hover:bg-button-accent transition-colors flex items-center gap-2"
              >
                সাইন আপ
              </Link>
            </>
          ) : (
            <div className="relative group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-text-primary to-[#3a9a91] flex items-center justify-center cursor-pointer text-white font-semibold shadow-md">
                {user.name?.[0]?.toUpperCase()}
              </div>

              {/* Hover Menu */}
              <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto border border-gray-100 z-50">
                <div className="p-4 border-b">
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
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
