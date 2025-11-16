import { useQuery } from "@tanstack/react-query";
import { getChats } from "../chatApi";

export const useGetChats = () => {
  return useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
  });
};
