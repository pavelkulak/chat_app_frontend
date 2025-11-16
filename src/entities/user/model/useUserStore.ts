import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserStore } from "./types";

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      setUser: (user) =>
        set({ user, isAuthenticated: true, isLoading: false, error: null }),
      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      updateUser: (user) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...user } : null,
        })),
    }),
    {
      name: "user-storage", // ключ в localStorage
    }
  )
);
