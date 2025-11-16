import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "../messagesApi";

export const useMessages = (chatId: number) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => getMessages(chatId),
    enabled: chatId > 0, // Запрос только если chatId валидный
  });

  return { ...query, queryClient };
};
