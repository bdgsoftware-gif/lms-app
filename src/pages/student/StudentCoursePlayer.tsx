import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCoursePlayer } from "../../api/coursePlayer.api";
import { fetchResumeLesson } from "../../api/resume.api";
import CourseSidebar from "../../student/CourseSidebar";
import VideoPlayer from "../../student/VideoPlayer";
import CoursePlayerTopbar from "../../student/CoursePlayerTopbar";

const StudentCoursePlayer = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState<any>(null);
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!courseId) return;

    Promise.all([
      fetchCoursePlayer(Number(courseId)),
      fetchResumeLesson(Number(courseId)),
    ])
      .then(([courseRes, resumeLessonId]) => {
        setCourseData(courseRes);

        // Find the lesson to start with
        const allLessons = courseRes.modules.flatMap((m: any) => m.lessons);
        const resumeLesson = allLessons.find(
          (l: any) => l.id === resumeLessonId && !l.is_locked,
        );
        const firstUnlockedLesson = allLessons.find((l: any) => !l.is_locked);

        setActiveLessonId(resumeLesson?.id || firstUnlockedLesson?.id || null);
      })
      .catch((error) => {
        console.error("Failed to load course:", error);
      });
  }, [courseId]);

  // Get all lessons in order for next/prev navigation
  const allLessons = courseData?.modules.flatMap((m: any) => m.lessons) || [];
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
