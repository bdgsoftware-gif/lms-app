import api from "./axios";

export const fetchCoursePlayer = async (courseId: number) => {
  const res = await api.get(`/student/courses/${courseId}`);
  return res.data;
};

export const fetchLessonVideo = async (lessonId: number) => {
  const res = await api.get(`/student/lessons/${lessonId}/watch`);
  return res.data;
};
