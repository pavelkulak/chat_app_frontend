import { api } from "@/shared/lib/api";
import type { Chat } from "@/entities/chat";

type CreateChatDto = {
  name: string;
  memberIds: number[]; // массив ID участников (пока только создатель)
};

export const createChat = async (dto: CreateChatDto): Promise<Chat> => {
  const response = await api.post("/chat/register_chat", dto);
  return response.data.chat;
};
