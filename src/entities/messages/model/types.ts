export interface Message {
  senderId: number;
  chatId: number;
  text: string;
  imageUrl: string;
  isRead: Boolean;
  sender: string;
  chat: string;
  createdAt: Date;
}
