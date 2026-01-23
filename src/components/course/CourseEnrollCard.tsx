import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import MobileEnrollCTA from "./MobileEnrollCTA";
import { useNavigate, useLocation } from "react-router-dom";
import {
  applyCoupon,
  checkEnrollmentStatus,
  startBkashCheckout,
} from "../../api/enroll.api";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  courseId: number;
  price: number;
}

const CourseEnrollCard = ({ courseId, price }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [coupon, setCoupon] = useState("");
  const [finalPrice, setFinalPrice] = useState(price);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!user) return;
    checkEnrollmentStatus(courseId).then((res) => {
      setEnrolled(res.enrolled);
    });
  }, [user, courseId]);

  const handleApplyCoupon = async () => {
    if (!coupon.trim()) {
      setError("কুপন কোড লিখুন");
      return;
    }

    setError("");
    setSuccess("");
    setCouponLoading(true);

    try {
      const res = await applyCoupon(courseId, coupon);

      if (!res.valid) {
        setError(res.message);
        return;
      }

      setDiscount(finalPrice - res.final_price);
      setFinalPrice(res.final_price);
      setCouponApplied(true);
      setSuccess("কুপন সফলভাবে প্রয়োগ হয়েছে");
    } catch {
      setError("কুপন যাচাই করা যায়নি");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await startBkashCheckout(courseId, coupon || undefined);

      if (res.message) {
        setSuccess("এনরোলমেন্ট সফল হয়েছে। ড্যাশবোর্ডে নেওয়া হচ্ছে...");
        setTimeout(() => navigate("/student/dashboard"), 1500);
        return;
      }

      window.location.href = res.bkash_url;
    } catch (err: any) {
      setError(err.response?.data?.message || "এনরোল ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     Already Enrolled State
  ======================= */
  if (enrolled) {
    return (
      <div className="hidden md:block sticky top-28 bg-white border rounded-xl p-6 shadow-sm text-center">
        <p className="text-green-600 font-semibold mb-4">
          আপনি ইতিমধ্যে এই কোর্সে এনরোল করেছেন
        </p>
        <button
          onClick={() => navigate(`/student/courses/${courseId}`)}
          className="w-full py-3 bg-brand-primary text-white rounded-lg font-medium"
        >
          কোর্সে যান
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden md:block sticky top-28 bg-white border rounded-xl shadow-sm"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            কোর্স এনরোলমেন্ট
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Price */}
          <div>
            <p className="text-sm text-gray-500 mb-1">কোর্স ফি</p>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ৳{finalPrice}
              </span>
              {discount > 0 && (
                <span className="text-sm text-green-600">
                  ৳{discount} ছাড়
                </span>
              )}
            </div>
          </div>

          {/* Coupon */}
          <div className="space-y-2">
            <input
              value={coupon}
              onChange={(e) => {
                setCoupon(e.target.value.toUpperCase());
                setError("");
                setSuccess("");
              }}
              disabled={couponApplied}
              placeholder="PROMO CODE"
              className="w-full border rounded-lg px-4 py-2 uppercase text-sm"
            />

            <button
              onClick={handleApplyCoupon}
              disabled={couponLoading || couponApplied}
              className="w-full py-2 border rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              {couponLoading
                ? "যাচাই হচ্ছে..."
                : couponApplied
                  ? "কুপন প্রয়োগ হয়েছে"
                  : "কুপন প্রয়োগ করুন"}
            </button>
          </div>

          {/* Messages */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-600"
              >
                {error}
              </motion.p>
            )}
            {success && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-green-600"
              >
                {success}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Enroll Button */}
          <button
            onClick={handleEnroll}
            disabled={loading}
            className="w-full py-3 bg-brand-primary text-white rounded-lg font-semibold disabled:opacity-60"
          >
            {loading
              ? "প্রক্রিয়া চলছে..."
              : user
                ? "এনরোল করুন"
                : "লগইন করে এনরোল করুন"}
          </button>
        </div>
      </motion.div>

      {/* Mobile CTA */}
      <MobileEnrollCTA
        price={finalPrice}
        enrolled={enrolled}
        loading={loading}
        onEnroll={handleEnroll}
      />
    </>
  );
};

export default CourseEnrollCard;
