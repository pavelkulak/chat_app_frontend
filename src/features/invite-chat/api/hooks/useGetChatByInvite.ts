import { useQuery } from "@tanstack/react-query";
import { getChatByInviteToken } from "../inviteApi";

export const useGetChatByInvite = (token: string | null) => {
  return useQuery({
    queryKey: ["chat-invite", token],

    queryFn: () => {
      if (!token) {
        throw new Error("Token is required");
      }
      return getChatByInviteToken(token);
    },

    enabled: !!token,
  });
};
