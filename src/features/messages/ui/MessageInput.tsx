import { FC, useState } from "react";
import { Button, HStack, Input } from "@chakra-ui/react";

type MessageInputProps = {
  chatId: number;
  onSend: (text: string) => void;
};

export const MessageInput: FC<MessageInputProps> = ({ chatId, onSend }) => {
  const [text, setText] = useState("");
  return (
    <HStack w="100%">
      <Input
        bg="white"
        type="text"
        placeholder="type your message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSend(text);
            setText("");
          }
        }}
      />
      <Button
        onClick={() => {
          onSend(text);
          setText("");
        }}
      >
        Send
      </Button>
    </HStack>
  );
};
