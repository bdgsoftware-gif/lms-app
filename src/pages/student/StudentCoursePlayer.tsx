import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCoursePlayer } from "../../api/coursePlayer.api";
import CourseSidebar from "../../student/CourseSidebar";
import VideoPlayer from "../../student/VideoPlayer";
import StudentTopbar from "../../student/StudentTopbar";

const StudentCoursePlayer = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState<any>(null);
  const [activeLesson, setActiveLesson] = useState<any>(null);

  useEffect(() => {
    if (!courseId) return;

    fetchCoursePlayer(Number(courseId)).then((res) => {
      setCourseData(res);

      // set first unlocked lesson by default
      const firstLesson = res.modules
        ?.flatMap((m: any) => m.lessons)
        ?.find((l: any) => !l.is_locked);

      setActiveLesson(firstLesson);
    });
  }, [courseId]);

  if (!courseData || !activeLesson) {
    return <p className="p-6">Loading course...</p>;
  }

  return (
    <div className="flex min-h-screen bg-bg-card">
      {/* Left Sidebar */}
      <CourseSidebar
        modules={courseData.modules}
        activeLessonId={activeLesson.id}
        onLessonSelect={setActiveLesson}
      />

      {/* Right Video Area */}
      <div className="flex-1">
        <StudentTopbar />
        <main className="p-6">
          <VideoPlayer lesson={activeLesson} />
        </main>
      </div>
    </div>
  );
};

export default StudentCoursePlayer;
