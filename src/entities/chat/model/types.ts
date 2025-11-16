import { User } from "@/entities/user/model/types";

export type Message = {
  id: number;
  senderId: number;
  chatId: number;
  text?: string;
  imageUrl?: string;
  fileUrl?: string;
  isRead: boolean;
  createdAt: Date;
  sender: User;
  chat: Chat;
};

export type Chat = {
  id: number;
  name: string;
  avatar: string;
  members: User[];
  messages: Message[];
  inviteToken?: string;
  createdAt: Date;
  updatedAt: Date;
};
