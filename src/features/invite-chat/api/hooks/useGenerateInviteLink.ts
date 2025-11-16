import { useMutation } from "@tanstack/react-query";
import { generateInviteLink } from "../inviteApi";

export const useGenerateInviteLink = () => {
  return useMutation({
    mutationFn: generateInviteLink,
    onSuccess: (data) => {
      navigator.clipboard.writeText(data.inviteLink);
    },
  });
};
