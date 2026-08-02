import api from "./api";
import type { LoginFormData } from "../types/auth";

export async function login(formData: LoginFormData) {
  const response = await api.post(
    "/auth/login",
    formData
  );

  return response.data;
}