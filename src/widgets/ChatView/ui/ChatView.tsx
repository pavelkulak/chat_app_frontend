import {
  VStack,
  HStack,
  Text,
  Box,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FC, useEffect, useState, useRef } from "react";
import { Chat } from "@/entities/chat";
import { InviteButton } from "@/features/invite-chat/ui/InviteButton";
import { MessageInput } from "@/features/messages/ui/MessageInput";
import { MessageList } from "@/entities/messages/ui/MessageList";
import { useMessages } from "@/entities/messages/api/hooks/useMessages";
import { useUserStore } from "@/entities/user/model/useUserStore";
import { socket } from "@/shared/lib/socket/socket";
import { Icon } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";

type ChatViewProps = {
  chat: Chat | null;
  onBack?: () => void;
};

export const ChatView: FC<ChatViewProps> = ({ chat, onBack }) => {
  const { data: initialMessages } = useMessages(chat?.id || 0);
  const [messages, setMessages] = useState(initialMessages || []);
  const { user } = useUserStore();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(initialMessages || []);
  }, [initialMessages]);

  // Автоматический скролл вниз при изменении сообщений
  useEffect(() => {
    if (scrollContainerRef.current && messages.length > 0) {
      const container = scrollContainerRef.current;
      // Используем requestAnimationFrame для плавного скролла после рендера
      requestAnimationFrame(() => {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  }, [messages]);

  // Начальный скролл вниз при открытии чата
  useEffect(() => {
    if (chat && scrollContainerRef.current) {
      // Небольшая задержка для гарантии, что DOM обновился
      const timer = setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop =
            scrollContainerRef.current.scrollHeight;
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [chat?.id]);

  useEffect(() => {
    if (!chat) return;

    const joinChat = () => {
      console.log(
        "[SOCKET] Joining chat:",
        chat.id,
        "Connected:",
        socket.connected
      );
      socket.emit("chat:join", String(chat.id));
    };

    // Если socket уже подключен, присоединяемся сразу
    if (socket.connected) {
      joinChat();
    } else {
      // Если не подключен, ждем события connect
      console.log("[SOCKET] Waiting for connection...");
      socket.once("connect", joinChat);
    }

    // слушаем новые сообщения
    const handleNewMessage = (message: any) => {
      console.log("[SOCKET] New message received:", message);
      setMessages((prev) => [...prev, message]);
    };

    socket.on("chat:message", handleNewMessage);

    return () => {
      socket.off("chat:message", handleNewMessage);
      socket.off("connect", joinChat);
      if (socket.connected) {
        socket.emit("chat:leave", String(chat.id));
      }
    };
  }, [chat?.id]);

  const handleSend = (content: string) => {
    if (!chat) return;

    socket.emit("chat:message", {
      chatId: String(chat.id),
      content,
    });
  };

  if (!chat) {
    return (
      <VStack flex={1} h="100vh" justify="center" align="center">
        <Box bg="gray.50" p={6} borderRadius="lg">
          <Text fontSize="xl" color="gray.500">
            Выберите чат из списка
          </Text>
        </Box>
      </VStack>
    );
  }

  return (
    <VStack
      flex={1}
      h="100vh"
      w="100%"
      p={{ base: 0, md: 6 }}
      gap={0}
      align="stretch"
    >
      <HStack
        w="100%"
        justify="space-between"
        align="center"
        bg="gray.50"
        p={4}
        gap={2}
      >
        <HStack gap={2} flex={1}>
          {isMobile && onBack && (
            <IconButton
              aria-label="Назад к списку чатов"
              onClick={onBack}
              variant="ghost"
              size="sm"
            >
              <Icon as={MdArrowBack} />
            </IconButton>
          )}
          <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold" truncate>
            {chat.name}
          </Text>
        </HStack>
        <InviteButton chatId={chat.id} />
      </HStack>

      <Box
        ref={scrollContainerRef}
        flex={1}
        w="100%"
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "gray.300",
            borderRadius: "4px",
          },
        }}
      >
        <MessageList messages={messages || []} currentUserId={user?.id || 0} />
      </Box>
      <Box w="100%" p={{ base: 2, md: 0 }}>
        <MessageInput chatId={chat.id} onSend={handleSend} />
      </Box>
    </VStack>
  );
};
