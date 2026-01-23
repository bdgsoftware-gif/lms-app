import api from "./axios";

export const fetchCoursePlayer = async (courseId: number) => {
  const res = await api.get(`/student/courses/${courseId}`);
  // console.log(res.data);
  return res.data;
};

export const fetchLessonVideo = async (lessonId: number) => {
  const res = await api.get(`/student/lessons/${lessonId}/watch`);
  console.log("API Response:", res.data);
  return res.data.lesson;
};
