import { io } from "socket.io-client";

// URL сокета из переменной окружения
// Если не указан, используем текущий origin (для dev сервера с proxy)
// Для production укажите VITE_SOCKET_URL в .env
const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  (typeof window !== "undefined" ? window.location.origin : "");

const socket = io(SOCKET_URL, {
  // Передаем токен из кук для авторизации
  withCredentials: true,
  // Для ngrok может потребоваться дополнительная настройка
  transports: ["websocket", "polling"],
});

// Просто для отладки - смотрим в консоль что происходит
socket.on("connect", () => {
  console.log("✅ Socket подключен! ID:", socket.id);
  console.log("✅ Socket connected:", socket.connected);
});

socket.on("disconnect", (reason) => {
  console.log("❌ Socket отключен. Причина:", reason);
});

socket.on("connect_error", (error) => {
  console.error("❌ Ошибка подключения:", error.message);
  console.error("❌ Socket URL:", SOCKET_URL);
});

// Логируем ошибки чата
socket.on("chat:error", (error) => {
  console.error("❌ Chat error:", error);
});

export { socket };
