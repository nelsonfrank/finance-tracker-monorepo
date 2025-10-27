import api from "../api";
import { LoginFormPayload, LoginResponse, SignupFormPayload, SignupResponse } from "@/types/auth";

export const loginAPI = async (payload: LoginFormPayload) => {
  const { data } = await api.post<LoginResponse>("/auth/login", payload);
  return data;
};

export const refreshTokenAPI = async (payload: LoginFormPayload) => {
  const { data } = await api.post<LoginResponse>("/auth/refresh-token", payload);
  return data;
};

export const signupAPI = async (payload: SignupFormPayload) => {
  const { data } = await api.post<SignupResponse>("/auth/signup", payload);
  return data;
};
