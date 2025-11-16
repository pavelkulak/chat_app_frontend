import { HStack, useBreakpointValue, Box, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Chat } from "@/entities/chat";
import { ChatSidebar } from "@/widgets/ChatSidebar/ui/ChatSidebar";
import { ChatView } from "@/widgets/ChatView/ui/ChatView";
import { useGetChats } from "@/entities";

export function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const location = useLocation();
  const { data: chats } = useGetChats();

  // Автоматически выбираем чат после присоединения по приглашению
  useEffect(() => {
    const selectedChatId = location.state?.selectedChatId;
    if (selectedChatId && chats) {
      const chat = chats.find((c) => c.id === selectedChatId);
      if (chat) {
        setSelectedChat(chat);
        // Очищаем state после использования
        window.history.replaceState({}, document.title);
      }
    }
  }, [location.state, chats]);

  // На мобильных: показываем либо сайдбар, либо чат
  // На десктопе: показываем оба рядом
  const showSidebar = isMobile ? !selectedChat : true;
  const showChat = isMobile ? !!selectedChat : true;

  // Функция для возврата к списку чатов на мобильных
  const handleBackToSidebar = () => {
    setSelectedChat(null);
  };

  // На мобильных используем абсолютное позиционирование
  // На десктопе используем HStack
  if (isMobile) {
    return (
      <Box
        position="fixed"
        top={0}
        left={0}
        w="100vw"
        h="100vh"
        overflow="hidden"
      >
        {/* sidebar */}
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          display={showSidebar ? "block" : "none"}
          zIndex={showSidebar ? 1 : 0}
        >
          <ChatSidebar
            onChatSelect={(chat) => {
              setSelectedChat(chat);
            }}
            selectedChatId={selectedChat?.id}
          />
        </Box>

        {/* chat */}
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          display={showChat ? "block" : "none"}
          zIndex={showChat ? 1 : 0}
        >
          <ChatView
            chat={selectedChat}
            onBack={isMobile ? handleBackToSidebar : undefined}
          />
        </Box>
      </Box>
    );
  }

  // Десктоп: показываем оба рядом
  return (
    <HStack h="100vh" w="100vw" gap={0} align="stretch">
      {/* sidebar */}
      <Box w="300px" h="100%" flexShrink={0}>
        <ChatSidebar
          onChatSelect={(chat) => {
            setSelectedChat(chat);
          }}
          selectedChatId={selectedChat?.id}
        />
      </Box>

      {/* chat */}
      <Box flex={1} h="100%" minW={0}>
        <ChatView chat={selectedChat} />
      </Box>
    </HStack>
  );
}
