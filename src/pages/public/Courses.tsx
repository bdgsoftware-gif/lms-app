import { useEffect, useState } from "react";
import { fetchCourses } from "../../api/course.api";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { handleApiError } from "../../utils/errorHandler";

interface Course {
  id: number;
  title: string;
  slug: string;
  level: string;
  is_paid: boolean;
  image?: string;
  description?: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchCourses()
      .then((data) => setCourses(data.data))
      .catch((err) => {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">সকল কোর্স</h1>
          <p className="mt-2 text-lg text-gray-600">
            আপনার পছন্দের কোর্স খুঁজে নিন
          </p>
        </div>

        {error ? (
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-red-500 text-5xl">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-800">
                কোর্স লোড করতে সমস্যা হয়েছে
              </h2>
              <p className="text-gray-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition-colors"
              >
                আবার চেষ্টা করুন
              </button>
            </div>
          </div>
        ) : loading ? (
          // Skeleton Grid
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              কোনো কোর্স পাওয়া যায়নি
            </h3>
            <p className="text-gray-600">শীঘ্রই নতুন কোর্স যোগ করা হবে</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/courses/${course.slug}`}
                  className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                    {course.image ? (
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl">
                        📖
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-brand-primary transition-colors">
                      {course.title}
                    </h2>

                    {course.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {course.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                        {course.level}
                      </span>
                      <span
                        className={`text-sm font-semibold ${course.is_paid ? "text-green-600" : "text-gray-600"
                          }`}
                      >
                        {course.is_paid ? "Paid" : "Free"}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;