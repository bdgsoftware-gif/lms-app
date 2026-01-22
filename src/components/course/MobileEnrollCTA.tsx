import { useAuth } from "../../auth/AuthContext";

interface Props {
  price: number;
  enrolled: boolean;
  loading: boolean;
  onEnroll: () => void;
}

const MobileEnrollCTA = ({ price, enrolled, loading, onEnroll }: Props) => {
  const { user } = useAuth();

  if (enrolled) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Price */}
        <div>
          <p className="text-xs text-gray-500">Course Fee</p>
          <p className="text-lg font-semibold text-brand-primary">
            <span className="font-bengali">৳</span>
            {price}
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={onEnroll}
          disabled={loading}
          className="px-6 py-2 bg-button-primary text-white rounded-full text-sm font-medium disabled:opacity-50"
        >
          {loading
            ? "প্রক্রিয়া চলছে..."
            : user
              ? "এখনই এনরোল করুন"
              : "লগইন করে এনরোল করুন"}
        </button>
      </div>
    </div>
  );
};

export default MobileEnrollCTA;
