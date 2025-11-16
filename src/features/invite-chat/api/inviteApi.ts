import { api } from "@/shared";
import type { Chat } from "@/entities";

type InviteLinkResponse = {
  inviteToken: string;
  inviteLink: string;
};

export const generateInviteLink = async (
  chatId: number
): Promise<InviteLinkResponse> => {
  const response = await api.post<InviteLinkResponse>(
    `/chat/generate_invite_token/${chatId}`
  );
  return response.data;
};

type ChatByInviteTokenResponse = {
  id: number;
  name: string;
  avatar: string;
  isMember: boolean;
};

export const getChatByInviteToken = async (
  token: string
): Promise<ChatByInviteTokenResponse> => {
  const response = await api.get<ChatByInviteTokenResponse>(
    `/chat/get_chat_by_invite_token/${token}`
  );
  return response.data;
};

type JoinChatResponse = {
  message: string;
  chat: Chat;
};

export const joinChatByToken = async (
  token: string
): Promise<JoinChatResponse> => {
  const response = await api.post<JoinChatResponse>(
    `/chat/join_chat_by_token/${token}`
  );
  return response.data;
};
