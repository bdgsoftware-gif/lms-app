import { Course } from "./course";

export interface CompletedModules {
  completed: number;
  total: number;
  percent: number;
}

export interface DashboardStats {
  enrolled_courses: number;
  watch_time_minutes: number;
  certificates: number;
  completed_modules: CompletedModules;
}

export interface DashboardData {
  stats: DashboardStats;
  courses: Course[];
}
