import { VStack, Text, Field, Input, Button } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useCreateChat } from "../api/hooks/useCreateChat";
import { useUserStore } from "@/entities/user";

export const ChatForm: FC = () => {
  const { mutate: createChat } = useCreateChat();
  const [data, setData] = useState({
    name: "",
    avatar: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const { user } = useUserStore();
  return (
    <VStack>
      <Text>Chat Form</Text>
      <Field.Root orientation="horizontal">
        <Field.Label>Chat Name</Field.Label>
        <Input
          placeholder="John Doe"
          flex="1"
          value={data.name}
          onChange={handleChange}
          name="name"
        />
      </Field.Root>

      <Field.Root orientation="horizontal">
        <Field.Label>Image</Field.Label>
        <Input
          type="file"
          value={data.avatar}
          onChange={handleChange}
          name="avatar"
        />
      </Field.Root>
      <Button
        type="submit"
        onClick={() =>
          createChat({
            name: data.name,
            memberIds: [user!.id],
          })
        }
      >
        Create Chat
      </Button>
    </VStack>
  );
};
