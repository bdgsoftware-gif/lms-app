import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import MobileEnrollCTA from "./MobileEnrollCTA";
import { useNavigate } from "react-router-dom";
import {
  applyCoupon,
  checkEnrollmentStatus,
  startBkashCheckout,
} from "../../api/enroll.api";

interface Props {
  courseId: number;
  price: number;
  offerPrice?: number;
}

const CourseEnrollCard = ({ courseId, price, offerPrice }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  // console.log(price, offerPrice);
  // Determine initial price (use offer price if available and valid)
  const hasOffer = offerPrice && offerPrice > 0 && offerPrice < price;
  const initialPrice = hasOffer ? offerPrice : price;
  const [coupon, setCoupon] = useState("");
  const [finalPrice, setFinalPrice] = useState(initialPrice);
  const [originalPrice] = useState(price); // Keep original price for display
  const [loading, setLoading] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  // Calculate discount percentage
  const discountPercentage = hasOffer
    ? Math.round(((price - offerPrice) / price) * 100)
    : 0;

  // Check enrollment status
  useEffect(() => {
    if (!user) return;

    checkEnrollmentStatus(courseId).then((res) => {
      setEnrolled(res.enrolled);
    });
  }, [user, courseId]);

  // Apply coupon
  const handleApplyCoupon = async () => {
    if (!coupon.trim()) {
      setError("প্রমো কোড লিখুন");
      return;
    }

    setError("");
    setSuccess("");
    setCouponLoading(true);

    try {
      const res = await applyCoupon(courseId, coupon);

      if (!res.valid) {
        setError(res.message || "অবৈধ প্রমো কোড");
        return;
      }

      setFinalPrice(res.final_price);
      setCouponApplied(true);
      setSuccess("✅ প্রমো কোড সফলভাবে প্রয়োগ হয়েছে!");
    } catch {
      setError("অবৈধ প্রমো কোড");
    } finally {
      setCouponLoading(false);
    }
  };

  // Enroll logic
  const handleEnroll = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await startBkashCheckout(courseId, coupon || undefined);

      // ✅ FREE / 100% COUPON → ENROLLED
      if (res.message) {
        setSuccess("✅ এনরোলমেন্ট সফল! ড্যাশবোর্ডে যাচ্ছি...");
        setTimeout(() => {
          navigate("/student/dashboard");
        }, 2000);
        return;
      }

      window.location.href = res.bkash_url;
    } catch {
      setError("এনরোলমেন্ট ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // Already enrolled UI
  if (enrolled) {
    return (
      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <p className="text-green-600 font-medium text-center">
          আপনি ইতিমধ্যে এই কোর্সে এনরোল করেছেন
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Sticky Card */}
      <div className="sticky top-28 bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 bg-bg-card">
          <h1 className="text-xl font-semibold text-text-primary">
            কোর্স ওভারভিউ
          </h1>
        </div>

        <div className="p-4 space-y-6">
          {/* Price Section */}
          <div>
            <div className="flex justify-between items-start mb-2">
              <p className="font-bold text-text-primary text-lg">Course Fee</p>

              <div className="text-right">
                {/* Show original price if there's an offer OR coupon applied */}
                {(hasOffer || couponApplied) && (
                  <p className="text-gray-400 line-through text-sm mb-1">
                    <span className="font-bengali">৳</span>
                    {originalPrice}
                  </p>
                )}

                {/* Final Price */}
                <p className="font-bold text-brand-primary text-2xl">
                  <span className="font-bengali">৳</span>
                  {finalPrice}
                </p>
              </div>
            </div>

            {/* Discount Badge - Show only if there's an offer (not for coupon) */}
            {hasOffer && !couponApplied && (
              <div className="inline-block">
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {discountPercentage}% ছাড়
                </span>
              </div>
            )}

            {/* Additional savings from coupon */}
            {couponApplied && hasOffer && (
              <div className="mt-2 text-xs text-green-600 font-medium">
                মোট সাশ্রয়: ৳{originalPrice - finalPrice}
              </div>
            )}
          </div>

          {/* Coupon Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              প্রমো কোড আছে?
            </label>
            <div className="flex gap-2">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value.toUpperCase().trim())}
                placeholder="PROMO CODE"
                disabled={couponLoading || loading || couponApplied}
                className="flex-1 border rounded-lg px-4 py-2 text-sm uppercase disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                onClick={handleApplyCoupon}
                disabled={
                  couponLoading || loading || !coupon.trim() || couponApplied
                }
                className="px-4 py-2 border border-button-primary text-text-primary rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium"
              >
                {couponLoading ? (
                  <svg
                    className="animate-spin h-4 w-4"
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
                ) : couponApplied ? (
                  "✓ Applied"
                ) : (
                  "Apply"
                )}
              </button>
            </div>
          </div>

          {/* Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}

          {/* Enroll Button */}
          <button
            onClick={handleEnroll}
            disabled={loading || couponLoading}
            className="w-full px-6 py-3 bg-button-primary text-white rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-800 transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
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
                <span>প্রক্রিয়া চলছে...</span>
              </>
            ) : (
              "কোর্স এনরোল করুন"
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Lifetime access · Certificate included
          </p>
        </div>
      </div>

      {/* Mobile Bottom CTA */}
      <MobileEnrollCTA
        price={finalPrice}
        originalPrice={hasOffer || couponApplied ? originalPrice : undefined}
        enrolled={enrolled}
        loading={loading}
        onEnroll={handleEnroll}
      />
    </>
  );
};

export default CourseEnrollCard;
