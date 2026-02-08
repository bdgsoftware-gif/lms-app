import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const getTimeLeft = (startAt: string): TimeLeft | null => {
  const diff = new Date(startAt).getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

interface Props {
  startAt: string;
  endAt?: string;
  courseTitle?: string;
}

const CourseLockedScreen = ({ startAt, endAt, courseTitle }: Props) => {
  const [time, setTime] = useState<TimeLeft | null>(getTimeLeft(startAt));

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = getTimeLeft(startAt);
      setTime(timeLeft);

      // Auto-refresh when countdown reaches zero
      if (!timeLeft) {
        window.location.reload();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startAt]);

  if (!time) {
    // Show loading while page reloads
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-primary mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">কোর্স আনলক হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center space-y-8">
        {/* Lock Icon */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-brand-primary/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="relative text-8xl md:text-9xl">🔒</div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            কোর্স এখনও শুরু হয়নি
          </h1>
          {courseTitle && (
            <p className="text-lg text-gray-600 font-medium">{courseTitle}</p>
          )}
        </div>

        {/* Description */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-gray-700 text-sm md:text-base">
            ⏰ নির্ধারিত সময়ে কোর্সটি স্বয়ংক্রিয়ভাবে আনলক হবে এবং পেজ রিফ্রেশ
            হবে
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {Object.entries(time).map(([key, value]) => {
            const labels: Record<string, string> = {
              days: "দিন",
              hours: "ঘণ্টা",
              minutes: "মিনিট",
              seconds: "সেকেন্ড",
            };

            return (
              <div
                key={key}
                className="bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl py-4 md:py-6 text-center shadow-lg transform hover:scale-105 transition-transform duration-200"
              >
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {String(value).padStart(2, "0")}
                </p>
                <p className="text-xs md:text-sm text-white/90 font-medium">
                  {labels[key]}
                </p>
              </div>
            );
          })}
        </div>

        {/* Start Time Info */}
        <div className="pt-6 border-t space-y-2">
          <p className="text-sm text-gray-500 font-medium">কোর্স শুরু হবে</p>
          <p className="text-lg font-semibold text-gray-800">
            {new Date(startAt).toLocaleString("bn-BD", {
              dateStyle: "full",
              timeStyle: "short",
            })}
          </p>
          {endAt && (
            <p className="text-xs text-gray-500">
              শেষ হবে:{" "}
              {new Date(endAt).toLocaleString("bn-BD", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          )}
        </div>

        {/* Additional Info */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-800">
            💡 <strong>টিপস:</strong> এই পেজটি খোলা রাখুন। কোর্স শুরু হলে
            স্বয়ংক্রিয়ভাবে আপডেট হবে।
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseLockedScreen;
