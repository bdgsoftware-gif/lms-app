import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate, Navigate, Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/student/dashboard");
    } catch {
      setError("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়");
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return <Navigate to="/student/dashboard" />;
  }

  return (
    <div className="min-h-[80dvh] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="flex items-center justify-center">
            <img
              src={Logo}
              alt="C M Moin Academy Logo"
              className="h-10 w-auto"
            />
          </Link>
          <h1 className="text-xl font-semibold text-text-primary font-inter">
            আপনার একাউন্টে লগইন করুন
          </h1>
          <p className="text-sm text-text-secondary font-inter">
            আপনার শেখা আবার শুরু করুন
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm text-center font-inter">
              {error}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative font-inter">
            <input
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="ইমেইল বা মোবাইল নম্বর লিখুন"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          {/* Password */}
          <div className="relative font-inter">
            <input
              type="password"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="পাসওয়ার্ড লিখুন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-button-primary hover:bg-teal-800 text-white py-3 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                {/* Spinner */}
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>লগইন হচ্ছে...</span>
              </>
            ) : (
              "লগইন করুন"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-text-secondary font-inter">
          একাউন্ট নেই?{" "}
          <Link
            to="/register"
            className="text-brand-primary font-inter font-medium hover:underline"
          >
            রেজিস্ট্রেশন করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
