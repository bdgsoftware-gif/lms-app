import { useEffect, useState } from "react";
import StudentStats from "../../student/StudentStats";
import StudentCourses from "../../student/StudentCourses";
import { fetchStudentDashboard } from "../../api/dashboard.api";
import { useAuth } from "../../auth/AuthContext";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentDashboard()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-[#1E5E57] to-[#0F3E3A] text-white p-6 rounded-xl">
        <h1 className="text-2xl font-semibold">স্বাগতম, {user?.name}</h1>
        <p className="mt-2 text-white/80">
          আজকে শেখার জন্য প্রস্তুত? আপনার জার্নি চালিয়ে যান।
        </p>
      </div>

      {/* Stats */}
      <StudentStats stats={data.stats} />

      {/* Courses */}
      <StudentCourses courses={data.courses} />
    </div>
  );
};

export default StudentDashboard;
