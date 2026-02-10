import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";

interface Props {
  price: number;
  originalPrice?: number;
  enrolled: boolean;
  loading: boolean;
  onEnroll: () => void;
  coupon: string;
  onCouponChange: (value: string) => void;
  onApplyCoupon: () => void;
  couponLoading: boolean;
  couponApplied: boolean;
  error: string;
  success: string;
}

const MobileEnrollCTA = ({
  price,
  originalPrice,
  enrolled,
  loading,
  onEnroll,
  coupon,
  onCouponChange,
  onApplyCoupon,
  couponLoading,
  couponApplied,
  error,
  success,
}: Props) => {
  const { user } = useAuth();
  const [showCoupon, setShowCoupon] = useState(false);

  if (enrolled) return null;

  const hasOffer = originalPrice && originalPrice > price;
  const discountPercentage = hasOffer
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg lg:hidden">
      {/* Expandable Coupon Section */}
      {showCoupon && (
        <div className="px-4 pt-3 pb-2 border-b bg-gray-50 space-y-2">
          <div className="flex gap-2">
            <input
              value={coupon}
              onChange={(e) => onCouponChange(e.target.value.toUpperCase().trim())}
              placeholder="PROMO CODE"
              disabled={couponLoading || loading || couponApplied}
              className="flex-1 border rounded-lg px-3 py-2 text-sm uppercase disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={onApplyCoupon}
              disabled={couponLoading || loading || !coupon.trim() || couponApplied}
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
                "Applied"
              ) : (
                "Apply"
              )}
            </button>
          </div>

          {error && (
            <p className="text-red-600 text-xs">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-xs">{success}</p>
          )}
        </div>
      )}

      <div className="px-4 py-3">
        {/* Coupon toggle link */}
        {!couponApplied && (
          <button
            onClick={() => setShowCoupon((v) => !v)}
            className="text-xs text-brand-primary font-medium mb-2 flex items-center gap-1"
          >
            <svg
              className={`w-3 h-3 transition-transform ${showCoupon ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            প্রমো কোড আছে?
          </button>
        )}

        {/* Price and CTA Container */}
        <div className="flex items-center justify-between gap-3">
          {/* Price Section */}
          <div className="flex-shrink-0">
            <p className="text-xs text-gray-500 mb-1">Course Fee</p>
            {hasOffer ? (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {discountPercentage}% OFF
                  </span>
                  <p className="text-xs text-gray-400 line-through">
                    <span className="font-bengali">৳</span>
                    {originalPrice}
                  </p>
                </div>
                <p className="text-xl font-bold text-brand-primary">
                  <span className="font-bengali">৳</span>
                  {price}
                </p>
              </div>
            ) : (
              <p className="text-xl font-bold text-brand-primary">
                <span className="font-bengali">৳</span>
                {price}
              </p>
            )}
          </div>

          {/* CTA Button */}
          <button
            onClick={onEnroll}
            disabled={loading || couponLoading}
            className="flex-1 min-w-0 px-4 py-2.5 bg-button-primary text-white rounded-full text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-800 transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white flex-shrink-0"
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
                <span className="truncate">প্রক্রিয়া চলছে...</span>
              </>
            ) : (
              <span className="truncate">
                {user ? "এখনই এনরোল করুন" : "লগইন করুন"}
              </span>
            )}
          </button>
        </div>

        <p className="text-[10px] text-gray-400 text-center mt-1.5">
          Lifetime access · Certificate included
        </p>
      </div>
    </div>
  );
};

export default MobileEnrollCTA;
