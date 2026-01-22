import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

const LessonWatch = () => {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState<any>(null);

  useEffect(() => {
    if (!lessonId) return;

    api
      .get(`/student/lessons/${lessonId}/watch`)
      .then((res) => setLesson(res.data.lesson));
  }, [lessonId]);

  if (!lesson) {
    return <p className="p-6">Loading lesson...</p>;
  }

  return (
    <div className="p-6">
      <video src={lesson.video_url} controls className="w-full h-[70vh]" />
      <h1 className="mt-4 text-xl font-semibold">{lesson.title}</h1>
    </div>
  );
};

export default LessonWatch;
