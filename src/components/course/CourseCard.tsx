import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    slug: string;
    image: string;
    instructor: string;
    progress?: number;
    start_at?: string;
    end_at?: string;
    is_accessible?: boolean;
  };
}

const getTimeLeft = (startAt: string) => {
  const diff = new Date(startAt).getTime() - Date.now();
  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  if (days > 0) return `${days} দিন`;
  if (hours > 0) return `${hours} ঘণ্টা`;
  return `${minutes} মিনিট`;
};

const CourseCard = ({ course }: CourseCardProps) => {
  const [timeLeft, setTimeLeft] = useState<string | null>(
    course.start_at && !course.is_accessible
      ? getTimeLeft(course.start_at)
      : null,
  );

  useEffect(() => {
    if (!course.start_at || course.is_accessible) return;

    const interval = setInterval(() => {
      const time = getTimeLeft(course.start_at!);
      setTimeLeft(time);

      if (!time) {
        window.location.reload();
      }
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [course.start_at, course.is_accessible]);

  const isLocked = course.start_at && !course.is_accessible;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <div className="text-5xl mb-3">🔒</div>
            <p className="font-bold text-lg mb-1">শীঘ্রই শুরু হবে</p>
            {timeLeft && (
              <p className="text-sm bg-white/20 rounded-full px-4 py-1 inline-block">
                ⏰ আর {timeLeft}
              </p>
            )}
          </div>
        </div>
      )}

      <Link
        to={isLocked ? "#" : `/student/courses/${course.id}`}
        className={isLocked ? "pointer-events-none" : ""}
      >
        {/* Course Image */}
        <div className="relative h-48 overflow-hidden bg-gray-200">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          {isLocked && (
            <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              আসছে শীঘ্রই
            </div>
          )}
        </div>

        {/* Course Info */}
        <div className="p-5">
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
            {course.title}
          </h3>

          <p className="text-sm text-gray-600 mb-3">
            শিক্ষক: {course.instructor}
          </p>

          {/* Progress Bar or Start Time */}
          {!isLocked && course.progress !== undefined ? (
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">সম্পন্ন</span>
                <span className="font-semibold text-brand-primary">
                  {course.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-brand-primary to-brand-secondary h-full rounded-full transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          ) : isLocked && course.start_at ? (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
              <p className="text-xs text-amber-800 font-medium">
                📅 শুরু হবে:{" "}
                {new Date(course.start_at).toLocaleDateString("bn-BD", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          ) : null}

          {/* Action Button */}
          <button
            className={`w-full py-2.5 rounded-lg font-medium transition-colors ${
              isLocked
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-brand-primary text-white hover:bg-brand-secondary"
            }`}
            disabled={!!isLocked}
          >
            {isLocked ? "লক করা আছে" : "কোর্সে যান"}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
