import api from "./axios";

export const fetchStudentDashboard = async () => {
  const res = await api.get("/student/dashboard");
  return res.data;
};
