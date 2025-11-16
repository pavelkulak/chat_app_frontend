import { FC } from "react";
import { type Message } from "@/entities/chat";
import { VStack } from "@chakra-ui/react";
import { MessageItem } from "./MessageItem";

type MessageListProps = {
  messages: Message[];
  currentUserId: number;
};

export const MessageList: FC<MessageListProps> = ({
  messages,
  currentUserId,
}) => {
  return (
    <VStack w="100%" h="auto" minH="100%" justify="flex-end" p={4} gap={2}>
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          isMyMessage={message.senderId === currentUserId}
        />
      ))}
    </VStack>
  );
};
