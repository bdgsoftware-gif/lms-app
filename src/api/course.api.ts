import api from "./axios";

export const fetchCourses = async () => {
  const res = await api.get("/public/courses");
  // console.log("courses:", res.data);
  return res.data;
};

export const fetchCourseDetails = async (slug: string) => {
  const res = await api.get(`/public/courses/${slug}`);
  // console.log("course details:", res.data);
  return res.data.data;
};
