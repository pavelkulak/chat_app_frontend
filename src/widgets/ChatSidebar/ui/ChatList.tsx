import { Chat, ChatItem } from "@/entities";
import { VStack } from "@chakra-ui/react";
import { FC } from "react";

type ChatListProps = {
  chats: Chat[];
  onChatSelect: (chat: Chat) => void;
  selectedChatId?: number;
};

export const ChatList: FC<ChatListProps> = ({
  chats,
  onChatSelect,
  selectedChatId,
}) => {
  return (
    <VStack w="full" h="full" overflowY="auto" gap={0}>
      {chats.map((chat) => (
        <ChatItem
          key={chat.id}
          chat={chat}
          isActive={selectedChatId === chat.id}
          onClick={() => onChatSelect(chat)}
        />
      ))}
    </VStack>
  );
};
