import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../authApi";
import { useUserStore } from "@/entities/user";

export const useLogin = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);

      setUser({
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        avatar: null,
      });

      // Проверяем, есть ли сохраненный токен приглашения
      const pendingInviteToken = localStorage.getItem("pendingInviteToken");
      if (pendingInviteToken) {
        // Редиректим на страницу приглашения
        navigate(`/invite/${pendingInviteToken}`);
      } else {
        navigate("/");
      }
    },

    onError: (error: any) => {
      console.error("Login failed:", error);
      // Можно добавить toast уведомление об ошибке
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Ошибка входа";
      alert(errorMessage); // Временно, лучше использовать toast
    },
  });
};
