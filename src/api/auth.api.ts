import api from "./axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const login = async (payload: LoginPayload) => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};

export const register = async (payload: RegisterPayload) => {
  const res = await api.post("/auth/register", payload);
  return res.data;
};

export const fetchMe = async () => {
  const res = await api.get("/auth/me");
  // console.log(res.data.user);
  return res.data.user;
};

export const logout = async () => {
  await api.post("/auth/logout");
};
