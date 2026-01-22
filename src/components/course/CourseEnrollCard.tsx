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
}

const CourseEnrollCard = ({ courseId, price }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState("");
  const [finalPrice, setFinalPrice] = useState(price);
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Check enrollment status
  useEffect(() => {
    if (!user) return;

    checkEnrollmentStatus(courseId).then((res) => {
      setEnrolled(res.enrolled);
    });
  }, [user, courseId]);

  // Apply coupon
  const handleApplyCoupon = async () => {
    setError("");
    try {
      const res = await applyCoupon(courseId, coupon);

      if (!res.valid) {
        setError(res.message);
        return;
      }

      setFinalPrice(res.final_price);
    } catch {
      setError("Invalid coupon");
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

    try {
      const res = await startBkashCheckout(courseId, coupon || undefined);

      // ✅ FREE / 100% COUPON → ENROLLED
      if (res.message) {
        setSuccess("✅ Enrollment successful! Redirecting to dashboard...");
        setTimeout(() => {
          navigate("/student/dashboard");
        }, 2000);
        return;
      }

      window.location.href = res.bkash_url;
    } catch {
      setError("Enrollment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Already enrolled UI
  if (enrolled) {
    return (
      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <p className="text-green-600 font-medium text-center">
          You are already enrolled in this course
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

        <div className="p-4">
          {/* Price */}
          <div className="mb-6 flex justify-between items-center text-xl">
            <p className="font-bold text-text-primary">Course Fee</p>
            <p className="font-semibold text-brand-primary">
              <span className="font-bengali">৳</span>
              {finalPrice}
            </p>
          </div>

          {/* Coupon */}
          <div className="mb-6">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value.toUpperCase().trim())}
              placeholder="ENTER PROMO CODE"
              className="w-full border rounded px-4 py-2 uppercase"
            />
            <button
              onClick={handleApplyCoupon}
              className="mt-3 w-full border border-button-primary text-text-primary py-2 rounded"
            >
              Apply Coupon
            </button>
          </div>

          {/* Messages */}
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

          {/* Enroll */}
          <button
            onClick={handleEnroll}
            disabled={loading}
            className="text-base w-full px-6 py-2 bg-button-primary text-white rounded-full font-medium disabled:opacity-50"
          >
            {loading ? "প্রক্রিয়া চলছে..." : "কোর্স এনরোল করুন"}
          </button>

          <p className="mt-4 text-xs text-gray-500 text-center">
            Lifetime access · Certificate included
          </p>
        </div>
      </div>
      {/* Mobile Bottom CTA */}
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
