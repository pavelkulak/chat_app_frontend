import type { FC, PropsWithChildren } from "react";
import { Flex } from "@chakra-ui/react";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex
      minH="100dvh"
      align="center"
      justify="center"
      bgGradient="linear-gradient(90deg,rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%)"
      overflow="auto"
    >
      {children}
    </Flex>
  );
};
