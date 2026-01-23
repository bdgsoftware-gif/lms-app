import api from "./axios";

export const fetchResumeLesson = async (courseId: number) => {
  const res = await api.get(`/student/courses/${courseId}/resume`); 
  return res.data.lesson_id;
};
