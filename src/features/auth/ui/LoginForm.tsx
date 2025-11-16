import { useState, type FC } from "react";
import { Flex, Text, Input, Link, Button } from "@chakra-ui/react";
import { PasswordInput } from "@/shared/ui";
import { useLogin } from "../api/hooks";

export const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending } = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, password });
  };

  return (
    <Flex
      bg="white"
      px={{ base: 6, md: 24 }}
      py={{ base: 8, md: 16 }}
      borderRadius="lg"
      boxShadow="md"
      direction="column"
      align="center"
      justify="center"
      gap={4}
      w={{ base: "90vw", sm: "400px", md: "600px" }}
      maxW="600px"
      as="form"
      onSubmit={handleLogin}
    >
      <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
        Вход
      </Text>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        w="100%"
      />
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" loading={isPending} w="100%">
        {isPending ? "Вход..." : "Войти"}
      </Button>
      <Text fontSize={{ base: "sm", md: "md" }}>
        Нет аккаунта?{" "}
        <Link color="blue.500" href="/register">
          Регистрация
        </Link>
      </Text>
    </Flex>
  );
};
