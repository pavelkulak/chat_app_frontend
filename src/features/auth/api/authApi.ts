import { api } from "@/shared";
import { LoginDto, RegisterDto, AuthResponse } from "../model/types";

export const registerUser = async (
  data: RegisterDto
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", data);
  return response.data;
};

// Логин
export const loginUser = async (data: LoginDto): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", data);
  return response.data;
};

// Logout (если нужен запрос на сервер)
export const logoutUser = async (): Promise<void> => {
  await api.post("/auth/logout");
};
