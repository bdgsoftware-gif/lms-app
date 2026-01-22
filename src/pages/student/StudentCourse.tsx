import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCoursePlayer } from "../../api/coursePlayer.api";

const StudentCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    if (!courseId) return;

    fetchCoursePlayer(Number(courseId)).then(setCourse);
  }, [courseId]);

  if (!course) {
    return <p className="p-6">Loading course...</p>;
  }

  const firstLesson = course.modules
    ?.flatMap((m: any) => m.lessons)
    ?.find((l: any) => !l.is_locked);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">{course.course.title}</h1>

      <p className="text-gray-600">{course.course.description}</p>

      <button
        onClick={() =>
          firstLesson && navigate(`/student/lessons/${firstLesson.id}`)
        }
        className="px-6 py-2 bg-brand-primary text-white rounded"
      >
        {firstLesson ? "Resume Course" : "No Lessons Available"}
      </button>
    </div>
  );
};

export default StudentCourse;
