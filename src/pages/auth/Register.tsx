import { useState } from "react";
import { register } from "../../api/auth.api";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return; // prevent double clicks
    setLoading(true);

    try {
      await register(form); // call your API
      navigate("/login"); // go to login page
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 font-inter">
          {/* Name */}
          <input
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="আপনার পুরো নাম লিখুন"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          {/* Phone */}
          <input
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="মোবাইল নম্বর লিখুন"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          {/* Email */}
          <input
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="ইমেইল লিখুন"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* Password */}
          <input
            type="password"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="পাসওয়ার্ড লিখুন"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {/* Confirm Password */}
          <input
            type="password"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="পাসওয়ার্ড আবার লিখুন"
            value={form.password_confirmation}
            onChange={(e) =>
              setForm({ ...form, password_confirmation: e.target.value })
            }
          />

          {/* Terms */}
          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input type="checkbox" className="mt-1" required />
            <span className="font-inter">
              আমি <span className="text-brand-primary">টার্মস & কন্ডিশন</span>{" "}
              এবং <span className="text-brand-primary">প্রাইভেসি পলিসি</span>{" "}
              মেনে নিচ্ছি
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-full font-inter bg-brand-primary hover:bg-teal-800 text-white py-3 font-medium transition ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "দয়া করে অপেক্ষা করুন..." : "একাউন্ট খুলুন"}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-text-secondary font-inter">
            আগে থেকেই একাউন্ট আছে?{" "}
            <Link to="/login" className="text-brand-primary font-medium">
              লগইন করুন
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
