import { VStack, Text, Button, Spinner } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetChatByInvite,
  useJoinChatByInvite,
} from "@/features/invite-chat/api/hooks";
import { Avatar } from "@/shared";
import { useUserStore } from "@/entities/user";

export const InvitePage: FC = () => {
  // Получаем токен из URL параметров
  const { token } = useParams<{ token: string }>();

  // Хук для навигации
  const navigate = useNavigate();

  // Проверяем, авторизован ли пользователь
  const { isAuthenticated } = useUserStore();

  // Хук для получения информации о чате
  const { data, isLoading, error } = useGetChatByInvite(token || null);

  // Сохраняем токен приглашения в localStorage, если пользователь не авторизован
  useEffect(() => {
    if (token && !isAuthenticated) {
      // Сохраняем токен для использования после логина/регистрации
      localStorage.setItem("pendingInviteToken", token);
    } else if (token && isAuthenticated) {
      // Если пользователь авторизован и есть токен в URL, используем его
      // Очищаем сохраненный токен, так как используем токен из URL
      if (localStorage.getItem("pendingInviteToken") === token) {
        localStorage.removeItem("pendingInviteToken");
      }
    }
  }, [token, isAuthenticated]);

  // Очищаем токен, если пользователь уже участник чата
  useEffect(() => {
    if (data?.isMember && token) {
      localStorage.removeItem("pendingInviteToken");
    }
  }, [data?.isMember, token]);

  // Хук для присоединения к чату
  const { mutate: joinChat, isPending: isJoining } = useJoinChatByInvite();

  // Если пользователь не авторизован, показываем предложение войти
  if (!isAuthenticated) {
    return (
      <VStack h="100vh" justify="center" align="center" gap={4} p={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Приглашение в чат
        </Text>

        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Text color="red.500">Неверная ссылка приглашения</Text>
        ) : data ? (
          <>
            <VStack gap={4} align="center">
              <Avatar avatar={data.avatar} name={data.name} />
              <Text fontSize="xl" fontWeight="bold">
                {data.name}
              </Text>
            </VStack>

            <VStack gap={2} mt={8}>
              <Text>Для присоединения к чату необходимо войти:</Text>
              <Button onClick={() => navigate("/login")}>Войти</Button>
              <Button variant="ghost" onClick={() => navigate("/register")}>
                Зарегистрироваться
              </Button>
            </VStack>
          </>
        ) : null}
      </VStack>
    );
  }

  // Если пользователь авторизован
  if (isLoading) {
    return (
      <VStack h="100vh" justify="center" align="center">
        <Spinner size="xl" />
      </VStack>
    );
  }

  if (error || !data) {
    return (
      <VStack h="100vh" justify="center" align="center" gap={4}>
        <Text fontSize="xl" color="red.500">
          Неверная ссылка приглашения
        </Text>
        <Button onClick={() => navigate("/chat")}>Вернуться к чатам</Button>
      </VStack>
    );
  }

  // Если пользователь уже участник
  if (data.isMember) {
    return (
      <VStack h="100vh" justify="center" align="center" gap={4}>
        <Text fontSize="xl">Вы уже участник этого чата</Text>
        <Button onClick={() => navigate("/chat")}>Перейти к чатам</Button>
      </VStack>
    );
  }

  // Показываем информацию о чате и кнопку присоединения
  return (
    <VStack h="100vh" justify="center" align="center" gap={6} p={4}>
      <VStack gap={4} align="center">
        <Avatar avatar={data.avatar} name={data.name} />
        <Text fontSize="2xl" fontWeight="bold">
          {data.name}
        </Text>
      </VStack>

      <Button
        onClick={() => {
          if (token) {
            joinChat(token, {
              onSuccess: (response) => {
                // Очищаем сохраненный токен приглашения
                localStorage.removeItem("pendingInviteToken");
                // После успешного присоединения переходим к чатам
                // Если сервер вернул объект чата, можно передать его через state
                navigate("/chat", {
                  state: { selectedChatId: response?.chat?.id || data?.id },
                });
              },
            });
          }
        }}
        loading={isJoining}
        size="lg"
      >
        Присоединиться к чату
      </Button>
    </VStack>
  );
};
