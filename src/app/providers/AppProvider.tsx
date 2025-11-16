import { ChakraProvider } from "@chakra-ui/react";
import RouterProvider from "./RoterProvider";
import { QueryProvider } from "./QueryClientProvider";
import chatSystem from "../theme/ChatConfig";

export function Provider() {
  return (
    <QueryProvider>
      <ChakraProvider value={chatSystem}>
        <RouterProvider />
      </ChakraProvider>
    </QueryProvider>
  );
}
