import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCoursePlayer } from "../../api/coursePlayer.api";
import { fetchResumeLesson } from "../../api/resume.api";
import CourseSidebar from "../../student/CourseSidebar";
import VideoPlayer from "../../student/VideoPlayer";
import CoursePlayerTopbar from "../../student/CoursePlayerTopbar";
import { CoursePlayerData, Lesson } from "../../types/coursePlayer";
import { logger } from "../../utils/errorHandler";

const StudentCoursePlayer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState<CoursePlayerData | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEnrollPrompt, setShowEnrollPrompt] = useState(false);

  useEffect(() => {
    if (!courseId) return;

    const loadCourse = async () => {
      try {
        const [courseRes, resumeLessonId] = await Promise.all([
          fetchCoursePlayer(Number(courseId)),
          fetchResumeLesson(Number(courseId)),
        ]);

        setCourseData(courseRes);

        // Find the lesson to start with
        const allLessons = courseRes.modules.flatMap((m: Module) => m.lessons);
        const resumeLesson = allLessons.find((l: Lesson) => l.id === resumeLessonId);

        // If resume lesson exists and is accessible, use it
        // Otherwise, find first unlocked lesson
        const startLesson = resumeLesson && !resumeLesson.is_locked
          ? resumeLesson
          : allLessons.find((l: Lesson) => !l.is_locked);

        if (!startLesson) {
          setError("No accessible lessons found. Please enroll in this course.");
          return;
        }

        setActiveLessonId(startLesson.id);
      } catch (error: any) {
        logger.error("Failed to load course:", error);
        if (error.response?.status === 403) {
          setError("You don't have access to this course. Please enroll first.");
        } else {
          setError("Failed to load course. Please try again.");
        }
      }
    };

    loadCourse();
  }, [courseId]);

  // Get all lessons in order for next/prev navigation
  const allLessons: Lesson[] = courseData?.modules.flatMap((m) => m.lessons) || [];
  const currentIndex = allLessons.findIndex((l) => l.id === activeLessonId);

  const handleNextLesson = () => {
    if (currentIndex < allLessons.length - 1) {
      // Find next unlocked lesson
      for (let i = currentIndex + 1; i < allLessons.length; i++) {
        if (!allLessons[i].is_locked) {
          setActiveLessonId(allLessons[i].id);
          return;
        }
      }
    }
  };

  const handlePrevLesson = () => {
    if (currentIndex > 0) {
      // Find previous unlocked lesson
      for (let i = currentIndex - 1; i >= 0; i--) {
        if (!allLessons[i].is_locked) {
          setActiveLessonId(allLessons[i].id);
          return;
        }
      }
    }
  };

  const handleLessonSelect = (lessonId: number) => {
    const lesson = allLessons.find((l: Lesson) => l.id === lessonId);

    if (lesson?.is_locked) {
      // Show custom enrollment prompt modal
      setShowEnrollPrompt(true);
      return;
    }

    setActiveLessonId(lessonId);
    setSidebarOpen(false);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  if (!courseData || !activeLessonId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-gray-600">কোর্স লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  // Find next/prev unlocked lessons
  const hasNext = allLessons.slice(currentIndex + 1).some((l) => !l.is_locked);
  const hasPrev = allLessons.slice(0, currentIndex).some((l) => !l.is_locked);

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
          isEnrolled={courseData.course.is_enrolled}
          onLessonSelect={handleLessonSelect}
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

      {/* Enroll Prompt Modal */}
      {showEnrollPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">পাঠটি লক করা</h3>
              <p className="text-gray-600 mb-6">
                এই পাঠে অ্যাক্সেস পেতে কোর্সে এনরোল করুন
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowEnrollPrompt(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                >
                  বাতিল
                </button>
                <button
                  onClick={() => navigate(`/courses/${courseId}`)}
                  className="flex-1 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition font-medium"
                >
                  এনরোল করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCoursePlayer;