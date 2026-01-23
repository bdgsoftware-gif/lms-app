import { useAuth } from "../../auth/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  price: number;
  enrolled: boolean;
  loading: boolean;
  onEnroll: () => void;
}

const MobileEnrollCTA = ({ price, enrolled, loading, onEnroll }: Props) => {
  const { user } = useAuth();

  return (
    <AnimatePresence>
      {!enrolled && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-2xl lg:hidden"
        >
          <div className="flex items-center justify-between px-4 py-4">
            {/* Price */}
            <div>
              <p className="text-xs text-gray-500">কোর্স ফি</p>
              <motion.p
                key={price}
                initial={{ scale: 1.2, color: "#10b981" }}
                animate={{ scale: 1, color: "#047857" }}
                className="text-xl font-bold text-brand-primary"
              >
                <span className="font-bengali">৳</span>
                {price}
              </motion.p>
            </div>

            {/* CTA */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onEnroll}
              disabled={loading}
              className={`px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-full text-sm font-semibold shadow-lg ${loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
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
                  প্রক্রিয়া...
                </span>
              ) : user ? (
                "এখনই এনরোল করুন"
              ) : (
                "লগইন করে এনরোল করুন"
              )}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileEnrollCTA;