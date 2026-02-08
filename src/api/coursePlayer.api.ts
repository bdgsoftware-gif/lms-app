import api from "./axios";
import type {
  CoursePlayerResponse,
  LessonVideoData,
} from "../types/course.types";

export const fetchCoursePlayer = async (
  courseId: number,
): Promise<CoursePlayerResponse> => {
  try {
    const res = await api.get(`/student/courses/${courseId}`);
    return res.data;
  } catch (error: any) {
    // If it's a 403 with locked course info, return that
    if (error.response?.status === 403 && error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};

export const fetchLessonVideo = async (
  lessonId: number,
): Promise<LessonVideoData> => {
  const res = await api.get(`/student/lessons/${lessonId}/watch`);
  console.log("API Response:", res.data);
  return res.data.lesson;
};
