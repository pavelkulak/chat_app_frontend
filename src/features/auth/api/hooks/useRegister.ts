import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../authApi";
import { useUserStore } from "@/entities/user";

export const useRegister = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
      // 1. Сохраняем токены
      localStorage.setItem("accessToken", data.accessToken);

      // 2. Обновляем глобальный стейт
      setUser({
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        avatar: null, // при регистрации аватара нет
      });

      // 3. Проверяем, есть ли сохраненный токен приглашения
      const pendingInviteToken = localStorage.getItem("pendingInviteToken");
      if (pendingInviteToken) {
        // Редиректим на страницу приглашения
        navigate(`/invite/${pendingInviteToken}`);
      } else {
        navigate("/");
      }
    },

    onError: (error: any) => {
      // Можно показать toast с ошибкой
      console.error("Registration failed:", error);
    },
  });
};
