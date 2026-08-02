import api from "./api";
import type { AuthFormData } from "../types/auth";

export async function login(formData: AuthFormData) {
  const response = await api.post(
    "/auth/login",
    formData
  );

  return response.data;
}

export async function register(formData: AuthFormData) {
  const response = await api.post("/auth/register", formData);

  return response.data;
}