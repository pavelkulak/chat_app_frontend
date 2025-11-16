import { FC } from "react";
import { Button } from "@chakra-ui/react";
import { useGenerateInviteLink } from "../api";

type InviteButtonProps = {
  chatId: number;
};

export const InviteButton: FC<InviteButtonProps> = ({ chatId }) => {
  const { mutate: generateInviteLink } = useGenerateInviteLink();

  const handleGenerate = () => {
    generateInviteLink(chatId);
  };

  return <Button onClick={handleGenerate}>InviteButton</Button>;
};
