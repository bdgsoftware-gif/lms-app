import api from "./axios";
import { initCsrf } from "./csrf";

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

/**
 * LOGIN
 */
export const login = async (payload: LoginPayload) => {
  await initCsrf();
  const res = await api.post("/auth/login", payload);
  return res.data;
};

/**
 * REGISTER
 */
export const register = async (payload: RegisterPayload) => {
  await initCsrf();
  const res = await api.post("/auth/register", payload);
  return res.data;
};

/**
 * GET AUTH USER
 */
export const fetchMe = async () => {
  const res = await api.get("/auth/me");
  return res.data.user;
};

/**
 * LOGOUT
 */
export const logout = async () => {
  await api.post("/auth/logout");
};
