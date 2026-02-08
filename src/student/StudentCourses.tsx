import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Course {
  id: number;
  title: string;
  progress_percent: number;
  completed_modules: number;
  total_modules: number;
  thumbnail: string;
  image: string;
  instructor: {
    name: string;
  };
  progress: number;
  start_at?: string;
  end_at?: string;
  is_accessible?: boolean;
}

interface Props {
  courses: Course[];
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

const StudentCourses = ({ courses }: Props) => {
  const navigate = useNavigate();
  const [timeLeftMap, setTimeLeftMap] = useState<Record<number, string | null>>(
    {},
  );

  useEffect(() => {
    // Initialize time left for all locked courses
    const initialTimeLeft: Record<number, string | null> = {};
    courses.forEach((course) => {
      if (course.start_at && !course.is_accessible) {
        initialTimeLeft[course.id] = getTimeLeft(course.start_at);
      }
    });
    setTimeLeftMap(initialTimeLeft);

    // Update every minute
    const interval = setInterval(() => {
      const updatedTimeLeft: Record<number, string | null> = {};
      let shouldReload = false;

      courses.forEach((course) => {
        if (course.start_at && !course.is_accessible) {
          const time = getTimeLeft(course.start_at);
          updatedTimeLeft[course.id] = time;

          // If any course became accessible, reload
          if (!time) {
            shouldReload = true;
          }
        }
      });

      setTimeLeftMap(updatedTimeLeft);

      if (shouldReload) {
        window.location.reload();
      }
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [courses]);

  if (!courses.length) {
    return (
      <div className="bg-white rounded-xl border p-12 text-center">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          কোনো কোর্সে ভর্তি হননি
        </h3>
        <p className="text-gray-600 mb-6">
          শেখা শুরু করতে একটি কোর্সে ভর্তি হন
        </p>
        <button
          onClick={() => navigate("/courses")}
          className="px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition"
        >
          কোর্স ব্রাউজ করুন
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">আমার কোর্সসমূহ</h2>

      <div className="grid md:grid-cols-4 gap-6">
        {courses.map((course) => {
          const isLocked = course.start_at && !course.is_accessible;
          const timeLeft = timeLeftMap[course.id];

          return (
            <div
              key={course.id}
              className="bg-white rounded-xl border overflow-hidden relative"
            >
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

              <img
                src={course.image}
                className="w-full object-contain aspect-[4/3]"
                alt={course.title}
              />

              <div className="p-4">
                <h3 className="font-semibold line-clamp-2 min-h-[3rem]">
                  {course.title}
                </h3>

                {isLocked ? (
                  // Show start date for locked courses
                  <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-2">
                    <p className="text-xs text-amber-800 font-medium">
                      📅 শুরু হবে:{" "}
                      {new Date(course.start_at!).toLocaleDateString("bn-BD", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                ) : (
                  // Show progress for accessible courses
                  <>
                    <div className="mt-3 text-sm text-gray-600">
                      মডিউল: {course.completed_modules} / {course.total_modules}
                    </div>

                    {/* Progress bar */}
                    <div className="mt-2 h-2 bg-gray-200 rounded overflow-hidden">
                      <div
                        className="h-2 bg-brand-primary rounded transition-all duration-500"
                        style={{
                          width: `${course.progress_percent}%`,
                        }}
                      />
                    </div>
                  </>
                )}

                <button
                  onClick={() => {
                    if (!isLocked) {
                      navigate(`/student/courses/${course.id}`);
                    }
                  }}
                  disabled={!!isLocked}
                  className={`mt-4 w-full py-2 rounded transition ${
                    isLocked
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-brand-primary text-white hover:bg-brand-secondary"
                  }`}
                >
                  {isLocked ? "লক করা আছে" : "কোর্সে যান"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentCourses;
