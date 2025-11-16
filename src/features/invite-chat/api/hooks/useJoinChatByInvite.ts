import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinChatByToken } from "../inviteApi";

export const useJoinChatByInvite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinChatByToken,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.invalidateQueries({ queryKey: ["chat-invite"] });
    },
  });
};
