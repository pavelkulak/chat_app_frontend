import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../authApi";
import { useUserStore } from "@/entities/user";

export const useLogout = () => {
  const navigate = useNavigate();
  const clearUser = useUserStore((state) => state.clearUser);

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      // 1. Очищаем localStorage
      localStorage.removeItem("accessToken");

      // 2. Очищаем store
      clearUser();

      // 3. Редирект
      navigate("/login");
    },
  });
};
