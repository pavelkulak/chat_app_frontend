import {
  HStack,
  Icon,
  IconButton,
  VStack,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { LuArrowLeft, LuCirclePlus, LuUserPlus } from "react-icons/lu";
import { FC } from "react";

type CreateOptionsProps = {
  onClose: () => void;
  onSelectedChat: () => void;
  onSelectedGroup: () => void;
};

export const CreateOptions: FC<CreateOptionsProps> = ({
  onClose,
  onSelectedChat,
  onSelectedGroup,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const options = [
    {
      icon: LuCirclePlus,
      label: "New Chat",
      onClick: onSelectedChat,
    },
    {
      icon: LuUserPlus,
      label: "New Group",
      onClick: onSelectedGroup,
    },
  ];

  return (
    <VStack
      h="100vh"
      w={isMobile ? "full" : "300px"}
      bg="gray.400"
      alignItems="flex-start"
      gap={0}
    >
      <HStack
        p={4}
        gap={4}
        borderBottom="1px solid"
        bg="gray.200"
        w="full"
        borderColor="black"
      >
        <IconButton onClick={onClose}>
          <Icon as={LuArrowLeft} />
        </IconButton>
        <Text>Create Chat</Text>
      </HStack>
      {options.map((option, index) => (
        <HStack
          key={index}
          gap={4}
          p={4}
          borderBottom="1px solid"
          bg="gray.200"
          w="full"
          borderColor="black"
          cursor="pointer"
          _hover={{ bg: "gray.300" }}
          onClick={option.onClick}
        >
          <Icon as={option.icon} />
          <Text>{option.label}</Text>
        </HStack>
      ))}
    </VStack>
  );
};
