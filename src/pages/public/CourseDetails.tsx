import CourseHero from "../../components/course/CourseHero";
import CourseLayout from "../../components/course/CourseLayout";
import MoreCoursesSlider from "../../components/course/MoreCoursesSlider";
import FAQSection from "../../components/sections/FAQSection";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCourseDetails } from "../../api/course.api";
import { motion, AnimatePresence } from "framer-motion";

const CourseDetails = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(false);

    fetchCourseDetails(slug)
      .then((data) => {
        setCourse(data);
      })
      .catch((err) => {
        console.error("Failed to load course:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          {/* Animated Logo/Icon */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
            }}
            className="w-24 h-24 mx-auto bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center text-4xl shadow-2xl"
          >
            📚
          </motion.div>

          {/* Loading Text */}
          <div className="space-y-2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-gray-800"
            >
              কোর্স লোড হচ্ছে...
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600"
            >
              অনুগ্রহ করে একটু অপেক্ষা করুন
            </motion.p>
          </div>

          {/* Loading Dots */}
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-3 h-3 bg-brand-primary rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center space-y-6"
        >
          <div className="text-6xl">😞</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              কোর্স খুঁজে পাওয়া যায়নি
            </h2>
            <p className="text-gray-600">
              দুঃখিত, এই কোর্সটি লোড করতে সমস্যা হয়েছে
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => window.history.back()}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
            >
              ফিরে যান
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition font-medium"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CourseHero course={course} />
      <CourseLayout course={course} />
      <MoreCoursesSlider />
      <FAQSection />
    </motion.div>
  );
};

export default CourseDetails;