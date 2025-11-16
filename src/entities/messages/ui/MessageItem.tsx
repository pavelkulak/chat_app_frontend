import { FC } from "react";
import { type Message } from "@/entities/chat";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";

type MessageItemProps = {
  message: Message;
  isMyMessage: boolean;
};

export const MessageItem: FC<MessageItemProps> = ({ message, isMyMessage }) => {
  // Проверяем что sender существует (на случай если сервер не вернул)
  const senderName = message.sender?.username || "Unknown";

  return (
    <Box
      bg="gray.50"
      p={4}
      borderRadius="lg"
      ml={isMyMessage ? "auto" : 0}
      mr={isMyMessage ? 0 : "auto"}
      id={`message-${message.id}`}
    >
      <VStack align="flex-start">
        {!isMyMessage && <Text fontWeight="bold">{senderName}</Text>}
        <HStack>
          <Text>{message.text}</Text>
          <Text fontSize="2xs" opacity={0.7} transform="translateY(50%)">
            {new Date(message.createdAt).toLocaleTimeString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};
