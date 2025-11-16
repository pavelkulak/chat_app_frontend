import { Icon, IconButton, useBreakpointValue, VStack } from "@chakra-ui/react";
import { UserHeader } from "./UserHeader";
import { useUserStore } from "@/entities/user";
import { FC, useState } from "react";
import { useGetChats } from "@/entities";
import { ChatList } from "./ChatList";
import { CreateOptions } from "./CreateOptions";
import { LuCirclePlus } from "react-icons/lu";
import { ChatModal } from "@/features/create-chat/ui/ChatModal";
import { Chat } from "@/entities/chat";

type CreateMode = "options" | "chat" | "group" | null;

type ChatSidebarProps = {
  onChatSelect: (chat: Chat) => void;
  selectedChatId?: number;
};

export const ChatSidebar: FC<ChatSidebarProps> = ({
  onChatSelect,
  selectedChatId,
}) => {
  const { user } = useUserStore();
  const { data: chats } = useGetChats();
  const [createMode, setCreateMode] = useState<CreateMode>(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const handleCreateOptions = () => {
    setCreateMode("options");
  };

  return (
    <VStack
      h="100vh"
      w={isMobile ? "full" : "300px"}
      bg="gray.400"
      position="relative"
    >
      {createMode === "options" && (
        <CreateOptions
          onClose={() => setCreateMode(null)}
          onSelectedChat={() => setCreateMode("chat")}
          onSelectedGroup={() => setCreateMode("group")}
        />
      )}
      {createMode === null && (
        <>
          <UserHeader avatar={user?.avatar} username={user?.username} />
          <ChatList
            chats={chats || []}
            onChatSelect={onChatSelect}
            selectedChatId={selectedChatId}
          />
          <IconButton
            position="absolute"
            bottom={4}
            right={4}
            onClick={handleCreateOptions}
          >
            <Icon as={LuCirclePlus} />
          </IconButton>
        </>
      )}
      <ChatModal
        isOpen={createMode === "chat" || createMode === "group"}
        onClose={() => setCreateMode(null)}
        type={
          createMode === "chat"
            ? "chat"
            : createMode === "group"
            ? "group"
            : null
        }
      />
    </VStack>
  );
};
