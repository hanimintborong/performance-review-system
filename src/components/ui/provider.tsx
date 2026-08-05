"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/theme";
import { Toaster } from "@/components/ui/toaster";

export function Provider(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      {props.children}
      <Toaster />
    </ChakraProvider>
  );
}