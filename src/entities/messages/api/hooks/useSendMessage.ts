import { socket } from "@/shared/lib/socket/socket";

export const useSendMessage = () => {
  return (chatId: number, text: string, userId: number) => {
    socket.emit("chat:message", { chatId, text, userId });
  };
};
