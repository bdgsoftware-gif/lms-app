import api from "./axios";

export const fetchCourses = async () => {
  const res = await api.get("/public/courses");
  return res.data;
};

export const fetchCourseDetails = async (slug: string) => {
  const res = await api.get(`/public/courses/${slug}`);
  return res.data.data;
};
