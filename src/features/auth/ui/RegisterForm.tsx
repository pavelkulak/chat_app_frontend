import { useState, type FC } from "react";
import { Flex, Text, Input, Link, Button } from "@chakra-ui/react";
import { PasswordInput } from "@/shared/ui";
import { useRegister } from "../api/hooks";

export const RegisterForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { mutate: register, isPending } = useRegister();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    register({ email, password, username });
  };

  return (
    <Flex
      as="form"
      onSubmit={handleRegister}
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
    >
      <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
        Регистрация
      </Text>
      <Input
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        w="100%"
      />
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
        {isPending ? "Регистрация..." : "Зарегистрироваться"}
      </Button>
      <Text fontSize={{ base: "sm", md: "md" }}>
        Уже есть аккаунт?{" "}
        <Link color="blue.500" href="/login">
          Войти
        </Link>
      </Text>
    </Flex>
  );
};
