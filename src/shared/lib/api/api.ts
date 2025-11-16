import axios from "axios";

// Базовый URL API из переменной окружения
// Если не указан, используем "/api" (для dev сервера с proxy)
const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;

    // Если 401 (не 403!) и это не запрос на refresh/login/register
    if (
      error.response?.status === 401 &&
      !prevRequest.sent &&
      !prevRequest.url?.includes("/auth/refresh") &&
      !prevRequest.url?.includes("/auth/login") &&
      !prevRequest.url?.includes("/auth/register")
    ) {
      prevRequest.sent = true;

      try {
        // Получаем refresh token из cookie (отправляется автоматически с withCredentials: true)
        // Или можно получить из localStorage, если вы сохраняете его там
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);

        // Обновляем заголовок и повторяем запрос
        prevRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(prevRequest);
      } catch (refreshError) {
        // Если refresh не удался - удаляем токен и редиректим на логин
        localStorage.removeItem("accessToken");
        const { useUserStore } = await import("@/entities/user");
        useUserStore.getState().clearUser();

        if (
          typeof window !== "undefined" &&
          !window.location.pathname.includes("/login")
        ) {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
