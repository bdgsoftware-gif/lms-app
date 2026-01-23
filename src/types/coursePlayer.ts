export interface Lesson {
  id: number;
  title: string;
  duration: string;
  is_locked: boolean;
  is_completed?: boolean;
  video_url?: string;
  order: number;
}

export interface Module {
  id: number;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface CoursePlayerData {
  id: number;
  title: string;
  slug: string;
  description?: string;
  modules: Module[];
  progress?: number;
  is_enrolled: boolean;
}

export interface LessonVideoData {
  video_url: string;
  lesson: Lesson;
}
