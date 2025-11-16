import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Загружаем переменные окружения
  const env = loadEnv(mode, process.cwd(), "");
  const proxyTarget = env.VITE_PROXY_TARGET || "http://localhost:3000";

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
        },
      }),
    ],
    server: {
      host: true, // Разрешить доступ из сети
      allowedHosts: ["localhost", ".ngrok-free.dev", ".ngrok.io", ".ngrok.app"],
      proxy: {
        // Проксируем API запросы на сервер
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
        },
        // Проксируем Socket.IO
        "/socket.io": {
          target: proxyTarget,
          changeOrigin: true,
          ws: true,
        },
      },
    },
  };
});
