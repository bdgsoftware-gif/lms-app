import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCoursePlayer } from "../../api/coursePlayer.api";
import { fetchResumeLesson } from "../../api/resume.api";
import CourseSidebar from "../../student/CourseSidebar";
import VideoPlayer from "../../student/VideoPlayer";
import CoursePlayerTopbar from "../../student/CoursePlayerTopbar";
import CourseLockedScreen from "./CourseLockedScreen";

const StudentCoursePlayer = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState<any>(null);
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;

    setLoading(true);
    setError(null);

    Promise.all([
      fetchCoursePlayer(Number(courseId)),
      fetchResumeLesson(Number(courseId)),
    ])
      .then(([courseRes, resumeLessonId]) => {
        setCourseData(courseRes);

        // Only set active lesson if course is not locked
        if (!courseRes.locked && courseRes.modules) {
          const allLessons = courseRes.modules.flatMap((m) => m.lessons);
          const resumeLesson = allLessons.find(
            (l: any) => l.id === resumeLessonId && !l.is_locked,
          );
          const firstUnlockedLesson = allLessons.find((l: any) => !l.is_locked);

          setActiveLessonId(
            resumeLesson?.id || firstUnlockedLesson?.id || null,
          );
        }
      })
      .catch((err) => {
        console.error("Failed to load course:", err);
        setError(
          err.response?.data?.message ||
            "কোর্স লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [courseId]);

  // Get all lessons in order for next/prev navigation
  const allLessons = courseData?.modules?.flatMap((m: any) => m.lessons) || [];
  const currentIndex = allLessons.findIndex(
    (l: any) => l.id === activeLessonId,
  );

  const handleNextLesson = () => {
    if (currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1];
      if (!nextLesson.is_locked) {
        setActiveLessonId(nextLesson.id);
      }
    }
  };

  const handlePrevLesson = () => {
    if (currentIndex > 0) {
      const prevLesson = allLessons[currentIndex - 1];
      if (!prevLesson.is_locked) {
        setActiveLessonId(prevLesson.id);
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-primary mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium text-lg">
            কোর্স লোড হচ্ছে...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            একটি সমস্যা হয়েছে
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition font-medium"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    );
  }

  // Course locked state
  if (courseData?.locked) {
    return (
      <CourseLockedScreen
        startAt={courseData.start_at}
        endAt={courseData.end_at}
        courseTitle={courseData.course?.title}
      />
    );
  }

  // Normal course player
  if (!courseData || !activeLessonId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-600">কোনো লেসন পাওয়া যায়নি</p>
        </div>
      </div>
    );
  }

  const hasNext =
    currentIndex < allLessons.length - 1 &&
    !allLessons[currentIndex + 1]?.is_locked;
  const hasPrev = currentIndex > 0 && !allLessons[currentIndex - 1]?.is_locked;

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static z-40 h-screen transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0`}
      >
        <CourseSidebar
          courseTitle={courseData.course.title}
          modules={courseData.modules}
          activeLessonId={activeLessonId}
          onLessonSelect={(lessonId) => {
            setActiveLessonId(lessonId);
            setSidebarOpen(false);
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <CoursePlayerTopbar
          onMenuClick={() => setSidebarOpen(true)}
          courseTitle={courseData.course.title}
        />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <VideoPlayer
            key={activeLessonId}
            lessonId={activeLessonId}
            onNext={hasNext ? handleNextLesson : undefined}
            onPrev={hasPrev ? handlePrevLesson : undefined}
            currentLessonNumber={currentIndex + 1}
            totalLessons={allLessons.length}
          />
        </main>
      </div>
    </div>
  );
};

export default StudentCoursePlayer;
