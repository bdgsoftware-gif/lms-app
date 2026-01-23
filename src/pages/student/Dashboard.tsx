import { useEffect, useState } from "react";
import StudentStats from "../../student/StudentStats";
import StudentCourses from "../../student/StudentCourses";
import { fetchStudentDashboard } from "../../api/dashboard.api";
import { useAuth } from "../../auth/AuthContext";
import { DashboardData } from "../../types/dashboard";
import { logger } from "../../utils/errorHandler";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentDashboard()
      .then(setData)
      .catch((error) => {
        logger.error("Failed to load dashboard:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div
            className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-primary mx-auto"
            role="status"
            aria-label="লোড হচ্ছে"
          >
            <span className="sr-only">ড্যাশবোর্ড লোড হচ্ছে...</span>
          </div>
          <p className="text-gray-600 font-medium">ড্যাশবোর্ড লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-5xl">⚠️</div>
          <p className="text-gray-600">ড্যাশবোর্ড লোড করতে সমস্যা হয়েছে</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    );
  }

  // Get current time greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "সুপ্রভাত";
    if (hour < 17) return "শুভ অপরাহ্ন";
    if (hour < 21) return "শুভ সন্ধ্যা";
    return "শুভ রাত্রি";
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative bg-gradient-to-br from-brand-primary via-teal-700 to-brand-secondary text-white p-8 rounded-2xl shadow-xl overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">👋</span>
            <h1 className="text-3xl font-bold">{getGreeting()}, {user?.name}!</h1>
          </div>
          <p className="text-lg text-white/90 mt-3">
            আজকে শেখার জন্য প্রস্তুত? আপনার জার্নি চালিয়ে যান।
          </p>
        </div>
      </div>

      {/* Stats */}
      <StudentStats stats={data.stats} />

      {/* Courses */}
      <StudentCourses courses={data.courses} />
    </div>
  );
};

export default StudentDashboard;