import type { ReactNode } from "react";
import { Flex, Menu } from "@chakra-ui/react";

type MenuActionProps = {
  value: string;
  icon: ReactNode;
  onSelect: () => void;
  tone?: "default" | "danger";
  children: ReactNode;
};

export function MenuAction({ value, icon, onSelect, tone = "default", children }: MenuActionProps) {
  return (
    <Menu.Item
      value={value}
      onSelect={onSelect}
      color={tone === "danger" ? "error.70" : "grey.80"}
      borderRadius="6px"
      px="10px"
      py="8px"
      cursor="pointer"
      _highlighted={{ bg: tone === "danger" ? "error.10" : "grey.10" }}
    >
      <Flex align="center" gap="8px">{icon}{children}</Flex>
    </Menu.Item>
  );
}
