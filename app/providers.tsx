// app/providers.tsx
"use client";

import { ApContextProvider } from "@/context/context";
import { ChakraProvider } from "@chakra-ui/react";

export function ApProviders({ children }: { children: React.ReactNode }) {
  return (
    <ApContextProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </ApContextProvider>
  );
}
