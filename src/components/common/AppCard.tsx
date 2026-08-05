import type { ReactNode } from "react";
import { Box, type BoxProps } from "@chakra-ui/react";

type AppCardProps = BoxProps & {
  children: ReactNode;
};

export function AppCard({ children, ...rest }: AppCardProps) {
  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderColor="grey.20"
      borderRadius="12px"
      overflow="hidden"
      {...rest}
    >
      {children}
    </Box>
  );
}
