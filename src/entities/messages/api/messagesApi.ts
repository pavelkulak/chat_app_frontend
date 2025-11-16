import { api } from "@/shared";
import { Message } from "@/entities/chat/model/types";

export const getMessages = async (chatId: number): Promise<Message[]> => {
  const response = await api.get(`/messages/get_messages/${chatId}`);
  return response.data.messages;
};
