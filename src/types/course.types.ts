// types/course.types.ts

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  instructor: string;
  start_at?: string;
  end_at?: string;
  is_accessible?: boolean;
  progress?: number;
}

export interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  is_free: boolean;
  is_completed: boolean;
  is_locked: boolean;
}

export interface CoursePlayerResponse {
  locked: boolean;
  message?: string;
  start_at?: string;
  end_at?: string;
  is_upcoming?: boolean;
  has_ended?: boolean;
  course?: {
    id: number;
    title: string;
    description: string;
    instructor: string;
    start_at?: string;
    end_at?: string;
  };
  modules?: Module[];
}

export interface LessonVideoData {
  id: number;
  title: string;
  video_url: string;
  duration: number;
}

export interface ApiError {
  message: string;
  start_at?: string;
  end_at?: string;
}
