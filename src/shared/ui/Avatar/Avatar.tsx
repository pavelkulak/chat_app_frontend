import { Box, Image, Text } from "@chakra-ui/react";
import { FC } from "react";

type AvatarProps = {
  avatar?: string | null;
  name?: string | null;
};

export const Avatar: FC<AvatarProps> = ({ avatar, name }) => {
  return (
    <Box
      w="50px"
      h="50px"
      borderRadius="full"
      bg="blue.600"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {avatar ? (
        <Image src={avatar} alt="avatar" />
      ) : (
        <Text>{name?.slice(0, 2)?.toUpperCase()}</Text>
      )}
    </Box>
  );
};
