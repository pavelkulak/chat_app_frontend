import { api } from "@/shared";
import { Chat } from "../model/types";

export const getChats = async (): Promise<Chat[]> => {
  const response = await api.get("/chat/get_all_chats");
  return response.data.chats;
};
