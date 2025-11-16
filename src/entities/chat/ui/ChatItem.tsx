import { HStack, Text } from "@chakra-ui/react";
import { Chat } from "../model";
import { FC } from "react";
import { Avatar } from "@/shared/ui";

type ChatItemProps = {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
};

export const ChatItem: FC<ChatItemProps> = ({ chat, isActive, onClick }) => {
  return (
    <HStack
      p={4}
      w="full"
      bg="gray.200"
      borderBottom="1px solid"
      borderColor="black"
    >
      <Avatar avatar={chat.avatar} name={chat.name} />
      <Text onClick={onClick} cursor="pointer">
        {chat.name}
      </Text>
    </HStack>
  );
};
