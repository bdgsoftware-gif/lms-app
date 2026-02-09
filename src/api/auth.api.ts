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

export const logout = async () => {
  await api.post("/auth/logout");
};

/**
 * GET AUTH USER
 * Backend /auth/me returns roles as full objects via load('roles').
 * Normalize to string[] to match the login/register response format.
 */
export const fetchMe = async () => {
  const res = await api.get("/auth/me");
  const user = res.data.user;

  if (user.roles && user.roles.length > 0 && typeof user.roles[0] === "object") {
    user.roles = user.roles.map((role: { name: string }) => role.name);
  }

  return user;
};
