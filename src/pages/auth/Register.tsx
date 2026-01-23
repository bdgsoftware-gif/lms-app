import { useState } from "react";
import { register } from "../../api/auth.api";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import Logo from "../../assets/logo.png";

const Register = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Basic validation
    if (!form.name || !form.phone || !form.email || !form.password) {
      setError("সকল ফিল্ড পূরণ করুন");
      return;
    }

    if (form.password !== form.password_confirmation) {
      setError("পাসওয়ার্ড মিলছে না");
      return;
    }

    if (form.password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (loading) return; // Prevent double clicks
    setLoading(true);

    try {
      await register(form);
      navigate("/login");
    } catch (err: any) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/student/dashboard" />;
  }

  return (
    <div className="min-h-[80dvh] flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
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
            নতুন একাউন্ট তৈরি করুন
          </h1>
          <p className="text-sm text-text-secondary font-inter">
            শেখার যাত্রা শুরু করুন
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-inter">
          {/* Name */}
          <div>
            <input
              type="text"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="আপনার পুরো নাম লিখুন"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="মোবাইল নম্বর লিখুন (যেমন: 01712345678)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="ইমেইল লিখুন"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              required
              minLength={8}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="পাসওয়ার্ড লিখুন (কমপক্ষে ৮ অক্ষর)"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              required
              minLength={8}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="পাসওয়ার্ড আবার লিখুন"
              value={form.password_confirmation}
              onChange={(e) =>
                setForm({ ...form, password_confirmation: e.target.value })
              }
            />
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 cursor-pointer"
              required
            />
            <span className="font-inter">
              আমি{" "}
              <Link to="/terms" className="text-brand-primary hover:underline">
                টার্মস & কন্ডিশন
              </Link>{" "}
              এবং{" "}
              <Link to="/privacy" className="text-brand-primary hover:underline">
                প্রাইভেসি পলিসি
              </Link>{" "}
              মেনে নিচ্ছি
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-full font-inter bg-brand-primary hover:bg-brand-secondary text-white py-3 font-medium transition ${loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
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
                দয়া করে অপেক্ষা করুন...
              </span>
            ) : (
              "একাউন্ট খুলুন"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-text-secondary font-inter">
          আগে থেকেই একাউন্ট আছে?{" "}
          <Link
            to="/login"
            className="text-brand-primary font-medium hover:underline"
          >
            লগইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;