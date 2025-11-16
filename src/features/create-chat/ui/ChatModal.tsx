import { FC } from "react";
import { ChatForm } from "./ChatForm";
import { CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";

type ChatModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "chat" | "group" | null;
};

export const ChatModal: FC<ChatModalProps> = ({ isOpen, onClose, type }) => {
  if (!type) return null;
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => {
        if (!e.open) onClose(); // вызываем onClose когда закрывается
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {type === "chat" ? "Создать чат" : "Создать группу"}
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body>
              {type === "chat" && <ChatForm />}
              {type === "group" && <Text>Group Form (пока не готов)</Text>}
            </Dialog.Body>

            {/* <Dialog.Footer> - опционально */}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
