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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/student/dashboard");
    } catch {
      setError("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়");
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

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative font-inter">
            <input
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="ইমেইল বা মোবাইল নম্বর লিখুন"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative font-inter">
            <input
              type="password"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="পাসওয়ার্ড লিখুন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-full bg-button-primary hover:bg-teal-800 text-white py-3 font-medium transition"
          >
            লগইন করুন
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-text-secondary font-inter">
          একাউন্ট নেই?{" "}
          <Link
            to="/register"
            className="text-brand-primary font-inter font-medium"
          >
            রেজিস্ট্রেশন করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
