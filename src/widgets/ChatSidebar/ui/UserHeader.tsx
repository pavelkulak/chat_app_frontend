import { HStack, Text } from "@chakra-ui/react";
import { Avatar } from "@/shared/ui";
import { FC } from "react";

type UserHeaderProps = {
  avatar?: string | null;
  username?: string | null;
};

export const UserHeader: FC<UserHeaderProps> = ({ avatar, username }) => {
  return (
    <HStack
      w="full"
      p={4}
      borderBottom="1px solid"
      borderColor="black"
      bg="gray.200"
    >
      <Avatar avatar={avatar} name={username} />
      <Text>{username}</Text>
    </HStack>
  );
};
