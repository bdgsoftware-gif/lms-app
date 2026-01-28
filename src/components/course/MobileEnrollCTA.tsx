import { useAuth } from "../../auth/AuthContext";

interface Props {
  price: number;
  originalPrice?: number;
  enrolled: boolean;
  loading: boolean;
  onEnroll: () => void;
}

const MobileEnrollCTA = ({
  price,
  originalPrice,
  enrolled,
  loading,
  onEnroll,
}: Props) => {
  const { user } = useAuth();

  if (enrolled) return null;

  const hasOffer = originalPrice && originalPrice > price;
  const discountPercentage = hasOffer
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg lg:hidden">
      <div className="px-4 py-3">
        {/* Price and CTA Container */}
        <div className="flex items-center justify-between gap-3">
          {/* Price Section */}
          <div className="flex-shrink-0">
            <p className="text-xs text-gray-500 mb-1">Course Fee</p>
            {hasOffer ? (
              <div className="space-y-1">
                {/* Discount Badge + Original Price */}
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {discountPercentage}% OFF
                  </span>
                  <p className="text-xs text-gray-400 line-through">
                    <span className="font-bengali">৳</span>
                    {originalPrice}
                  </p>
                </div>
                {/* Final Price */}
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
            disabled={loading}
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
      </div>
    </div>
  );
};

export default MobileEnrollCTA;
